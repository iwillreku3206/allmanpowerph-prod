import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db"; // Include your database logic
import { secureAdminHandler } from "@/lib/adminAuth"; // Adjust path if needed

export async function POST(req: Request) {
  return secureAdminHandler(req, async () => {
    try {
      // Read URL query parameter
      const url = new URL(req.url);
      const search_id = url.searchParams.get("search_id");

      if (!search_id) {
        return NextResponse.json({ error: "Search ID is required" }, { status: 400 });
      }

      // Parse the body of the request to get candidate data
      const candidateData = await req.json();
      console.log("Received candidate data:", candidateData);

      // Extract dynamic fields and create an object to store them as JSON
      const dynamicFields: Record<string, any> = {};

      // Loop through candidate data and add dynamic fields (skip assignedCandidate and assignedCandidateId)
      for (const [key, value] of Object.entries(candidateData)) {
        if (key !== 'assignedCandidate' && key !== 'assignedCandidateId') {
          dynamicFields[key] = value;
        }
      }

      // JSONify the dynamic fields
      const fieldsJson = JSON.stringify(dynamicFields);

      // Insert data into the database, preventing duplicates based on the unique constraint (e.g., user_id)
      await dbPool.query(
        `INSERT INTO connections (user_id, candidate_id, fields) 
         VALUES ($1, $2, $3) 
        `, 
        [search_id, candidateData.assignedCandidateId, fieldsJson]
      );

      return NextResponse.json({ success: true, message: "Candidate assigned successfully" }, { status: 200 });
    } catch (error) {
      console.error("Error assigning candidate:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });
}
