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
  // TODO: dumb fix, fix later
  // if (!fs.existsSync('./test/data/05-versions-space.pdf'))
  //   fs.writeFileSync('./test/data/05-versions-space.pdf', '')

  const req = await requestValidator.safeParseAsync({
    search: request.nextUrl.searchParams.get("search"),
    page: parseInt(request.nextUrl.searchParams.get("page") || "NaN"),
    count: request.nextUrl.searchParams.get("count"),
  });

  if (!req.success) {
    return Response.json({ error: "Invalid request", reason: req.error.format() }, { status: 400 });
  }

  const dataQuery = `
    SELECT count(*)
    FROM candidates
  `;

  const countQuery = await dbPool.query(dataQuery);
  const totalCount = countQuery.rows[0].count;

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

  const required_fields: JSON = searchSession.rows[0].fields;

  const processBatch = async (count: number = 0): Promise<any[]> => {

    const dataQuery = `
      SELECT c.id AS id, c.name AS name, c.monthly_salary AS monthly_salary, c.resume_url AS resume_url, 
            c.worker_type AS worker_type, ag.agency_fee AS agency_fee
      FROM candidates c
      JOIN agencies ag ON c.agency_id = ag.id
      LEFT JOIN connections conn ON c.id = conn.candidate_id AND conn.user_id = $1
      WHERE conn.candidate_id IS NULL 
      LIMIT 5
      OFFSET ${count * 5} ROWS;
    `;


    const dbRes = await dbPool.query(dataQuery, [req.data.search]);
    type CandidateJSON = {
      id: string,
      name: string,
      resume_url: string,
      agency_fee: string,
      monthly_salary: string,
      required_fields: any,
    }

    const analysisResults = await Promise.all(
      dbRes.rows.map(async (candidate: CandidateJSON) => {
        const candidateName: string = candidate.name;
        const resumeUrl: string = candidate.resume_url;
        const agencyFee: string = candidate.agency_fee;
        const salaryRange: string = candidate.monthly_salary;
        const requiredFields = JSON.stringify(required_fields);

        const result = await processResume(candidateName, resumeUrl, requiredFields, agencyFee, salaryRange);

        const status = result.includes("Yes") ? "Accepted" : "Rejected";
        const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/);

        let parsedJson: any = null;

        if (jsonMatch && jsonMatch[1]) {
          try {
            parsedJson = JSON.parse(jsonMatch[1]);
          } catch (err) {
            console.error("Invalid JSON:", err);
          }
        } else {
          console.error("No JSON found in the string.");
        }

        if (status === "Accepted") {
          try {
            await dbPool.query(
              `INSERT INTO connections (candidate_id, user_id, fields)
               VALUES ($1, $2, $3)
               ON CONFLICT (candidate_id, user_id) DO NOTHING;`,
              [candidate.id, req.data.search, parsedJson]
            );
          } catch (err) {
            console.error(`Error inserting into connections for candidate ${candidate.id}:`, err);
          }
          return candidate;
        }

        return null;
      })
    );

    return analysisResults.filter(candidate => candidate !== null);
  };

  let validCandidates: any[] = [];
  let count = 0;

  while (count * 5 < totalCount) {
    const batchResults = await processBatch(count);
    count++;

    if (batchResults.length === 0) {
      break;
    }

    validCandidates = [...validCandidates, ...batchResults];

    if (validCandidates.length >= 5) {
      break;
    }
  }

  return Response.json({ data: validCandidates.slice(0, 5), totalCount: validCandidates.length });
}
