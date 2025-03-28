import { dbPool } from "@/lib/db";
import { SearchSession } from "@/types/searchSession";
import { Search } from "lucide-react";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { QueryResult } from "pg";
import { requestFormReset } from "react-dom";
import { string, z } from "zod";


const requestValidator = z.object({
  search: z.string().uuid(),
  candidates: z.array(z.string().uuid()),
})

//! TODO: move this to utils at some point
function genDollarSignStr(values: number, count: number) {
  let out = ""
  for (let i = 0; i < count; i++) {
    out += '('
    for (let j = 0; j < values; j++) {
      out += '$' + ((values*i)+(j + 1))
      if (j != values - 1) out += ','
    }
    out += ')'
    if (i != count - 1) out += ','
  }
  return out
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

  const insertQuery = `
    INSERT INTO contact_request(candidate_id, search_id) VALUES ${genDollarSignStr(2, req.data.candidates.length)}
  `

  const candidates: string[] = []
  req.data.candidates.forEach(c => {
    candidates.push(c)
    candidates.push(req.data.search)
  })
  console.log({ insertQuery, candidates })
  await dbPool.query(insertQuery, candidates)

  return Response.json({ message: 'success' })
}
