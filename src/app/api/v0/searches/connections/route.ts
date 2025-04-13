import { dbPool } from "@/lib/db";
import { SearchSession } from "@/types/searchSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { QueryResult } from "pg";
import { z } from "zod";
import { processResume } from "@/utils/resumeProcessor";  // Import the resume analyzer
import { parse } from "path";

// Request validation schema
const requestValidator = z.object({
  search: z.string().uuid(),
  count: z.enum(["10", "20", "50"]).pipe(z.coerce.number()),
  page: z.number().positive(),
});

export async function GET(request: NextRequest) {
  // Validate inputs
  const req = await requestValidator.safeParseAsync({
    search: request.nextUrl.searchParams.get("search"),
    page: parseInt(request.nextUrl.searchParams.get("page") || "NaN"),
    count: request.nextUrl.searchParams.get("count"),
  });

  if (!req.success) {
    return Response.json({ error: "Invalid request", reason: req.error.format() }, { status: 400 });
  }

  const { count, page } = req.data;
  let searchSession: QueryResult<SearchSession> | undefined = undefined;
  const cookie = await cookies();
  const token = cookie.get(`session-search-${req.data.search}`)?.value;

  if (token) {
    searchSession = await dbPool.query<SearchSession>(
      `SELECT ss.*, s.fields, s.worker_type, s.id
       FROM search_sessions ss
       JOIN searches s ON ss.search = s.id
       WHERE ss.session_token = $1 AND ss.search = $2
       LIMIT 1;`,
      [token, req.data.search]
    );
  }

  if (!(searchSession && searchSession.rowCount === 1)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchId = searchSession.rows[0].search;
  const dataQuery = `
    SELECT can.id AS id, can.name AS name, con.fields AS fields, can.resume_url AS resume_url
    FROM connections con
    JOIN candidates can ON con.candidate_id = can.id
    JOIN agencies a ON a.id = can.agency_id
    WHERE user_id = $1
  `;

  const connectionsQuery = await dbPool.query(dataQuery, [searchId]);
  const connections = connectionsQuery.rows;

  return Response.json({ connections: connections.slice(count * (page - 1), count) });
}
