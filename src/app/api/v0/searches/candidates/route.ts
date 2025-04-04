import { dbPool } from "@/lib/db";
import { SearchSession } from "@/types/searchSession";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { QueryResult } from "pg";
import { z } from "zod";
import {processResume} from "@/utils/resumeProcessor";  // Import the resume analyzer

console.log('1')
console.log("hello", processResume)
console.log('2')
// Request validation schema
const requestValidator = z.object({
  search: z.string().uuid(),
  count: z.enum(["10", "20", "50"]).pipe(z.coerce.number()),
  page: z.number().positive(),
});

export async function GET(request: NextRequest) {
  console.log("hello")
  // Validate inputs
  const req = await requestValidator.safeParseAsync({
    search: request.nextUrl.searchParams.get("search"),
    page: parseInt(request.nextUrl.searchParams.get("page") || "NaN"),
    count: request.nextUrl.searchParams.get("count"),
  });

  if (!req.success) {
    return Response.json({ error: "Invalid request", reason: req.error.format() }, { status: 400 });
  }

  let searchSession: QueryResult<SearchSession> | undefined = undefined;
  const cookie = await cookies();
  const token = cookie.get(`session-search-${req.data.search}`)?.value;

  if (token) {
    searchSession = await dbPool.query<SearchSession>(
      `SELECT ss.*, s.fields, s.care_type
       FROM search_sessions ss
       JOIN searches s ON ss.search = s.id
       WHERE ss.session_token = $1 AND ss.search = $2 LIMIT 1;`,
      [token, req.data.search]
    );
  }

  if (!(searchSession && searchSession.rowCount === 1)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const required_fields: JSON = searchSession.rows[0].fields;

  // Function to fetch and process a batch of candidates
  const processBatch = async (): Promise<any[]> => {
    // SQL query to fetch 10 candidates from the database
    const dataQuery = `
      SELECT c.name AS name, c.monthly_salary AS monthly_salary, c.resume_url AS resume_url, 
             c.care_type AS care_type, ag.agency_fee AS agency_fee
      FROM candidates c
      JOIN agencies ag ON c.agency_id = ag.id
      LIMIT 10;
    `;

    console.log("hasfhas")
    
    // Fetch the data from the database
    const dbRes = await dbPool.query(dataQuery);

    // Analyze resumes concurrently for all candidates in the batch
    const analysisResults = await Promise.all(
      dbRes.rows.map(async (candidate) => {
        const candidateName = candidate.name;
        const resumeUrl = candidate.resume_url;
        const agencyFee = candidate.agency_fee; 
        const salaryRange = candidate.monthly_salary; 
        const requiredFields = JSON.stringify(required_fields); // Convert required fields to JSON
        

        console.log("Analyzing resume for candidate:", candidateName, "with URL:", resumeUrl);
        //Call resume_analyzer for analyzing the resume
        const result = await processResume(candidateName, resumeUrl, requiredFields, agencyFee, salaryRange);
        
        //Only return valid candidates (those that are accepted)
        return result.includes("Yes") ? candidate : null;
      })
    );

    // Filter out invalid candidates (null values)
    return analysisResults.filter(candidate => candidate !== null);
  };

  let validCandidates: any[] = [];

  // Keep reading the database until we get 10 valid candidates
  while (validCandidates.length < 10) {
    const batchResults = await processBatch();

    // If no valid candidates were returned, break the loop
    if (batchResults.length === 0) {
      break;
    }

    // Add valid candidates to the validCandidates array
    validCandidates = [...validCandidates, ...batchResults];

    // If we have found 10 valid candidates, stop fetching more
    if (validCandidates.length >= 10) {
      break;
    }
  }

  // Return the valid candidates (limit to 10)
  return Response.json({ data: validCandidates.slice(0, 10), totalCount: validCandidates.length });
}
