import { dbPool } from "@/lib/db";
import { SearchSession } from "@/types/searchSession";
import { Search } from "lucide-react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { QueryResult } from "pg";
import { requestFormReset } from "react-dom";
import { string, z } from "zod";

export interface DbQueryResponse {
  id: string,
  name: string,
  fields: { [key: string]: string },
  resume_url: string,
  requested_interview: boolean
  search_fields: { key: string, value: string }[]
  care_type: string
}

const requestValidator = z.object({
  search: z.string().uuid(),
  count: z.enum(["10", "20", "50"]).pipe(z.coerce.number()),
  page: z.number().positive()
})

export async function GET(request: NextRequest) {
  // validate inputs
  const req = await requestValidator.safeParseAsync({
    search: request.nextUrl.searchParams.get('search'),
    page: parseInt(request.nextUrl.searchParams.get('page') || 'NaN'),
    count: request.nextUrl.searchParams.get('count'),
  })

  if (!req.success) {
    return Response.json({ error: 'Invalid request', reason: req.error.format() }, { status: 400 })
  }

  let searchSession: QueryResult<SearchSession> | undefined = undefined;

  const cookie = await cookies()
  const token = cookie.get(`session-search-${req.data.search}`)?.value
  if (token) {
    searchSession = await dbPool.query<SearchSession>("SELECT * FROM search_sessions WHERE session_token = $1 AND search = $2 LIMIT 1", [token, req.data.search])
  }

  if (!(searchSession && searchSession.rowCount === 1)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const dataQuery = `
    SELECT  c.id AS id,
            c.name AS name,
            sc.fields AS fields,
            c.resume_url AS resume_url,
            false AS requested_interview,
            s.fields AS search_fields,
            s.care_type AS care_type
    FROM    connections sc
    JOIN    candidates c
        ON  sc.candidate_id = c.id
    JOIN    searches s
        ON  s.id = sc.user_id
        AND s.id = $1
    LIMIT  $2
    OFFSET $3
  `

  const dbRes = await dbPool.query<DbQueryResponse>(dataQuery, [req.data.search, req.data.count, req.data.count * (req.data.page - 1)])

  const count = await dbPool.query<{ count: number }>(`SELECT COUNT(*) AS count FROM connections sc WHERE sc.user_id = $1`, [req.data.search])

  return Response.json({ data: dbRes.rows, totalCount: count.rows[0].count })
}
