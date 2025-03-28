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
}

const requestValidator = z.object({
  search: z.string().uuid(),
  candidates: z.array(z.string().uuid()),
  availability: z.string()
})

//! TODO: move this to utils at some point
function genDollarSignStr(values: number, count: number) {
  let out = ""
  for (let i = 0; i < count; i++) {
    out += '('
    for (let j = 0; j < values; j++) {
      out += ('$' + j + 1)
      if (j != values - 1) out += ','
    }
    out += ')'
    if (i != count - 1) out += ','
  }
}


export async function POST(request: NextRequest) {
  // validate inputs
  const req = await requestValidator.safeParseAsync(await request.json())

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

  const insertQuery1 = `
    INSERT INTO candidate_interview_requests(search_id, availability) VALUES ($1, $2) RETURNING id
  `

  const dbRes1 = await dbPool.query<{ id: string }>(insertQuery1, [req.data.search, req.data.availability])

  const insertQuery2 = `
    INSERT INTO candidate_interview_request_interviewees(candidate_id, request_id) VALUES ${genDollarSignStr(2, req.data.candidates.length)}
  `

  const candidates: string[] = []
  req.data.candidates.forEach(c => {
    candidates.push(c)
    candidates.push(dbRes1.rows[0].id)
  })
  await dbPool.query<DbQueryResponse>(insertQuery2, candidates)

  return Response.json({ message: 'success' })
}
