import { dbPool } from "@/lib/db";
import { NextRequest } from "next/server";


// Define the API endpoint to fetch details of a search session
export async function GET(request: NextRequest, { params }: any) {
  const { id } = await params;

  try {
    // Query the searches table to get the fields and worker_type for the given search id
    const searchQuery = `
      SELECT fields, worker_type 
      FROM searches
      WHERE id = $1
      LIMIT 1;
    `;

    const result = await dbPool.query(searchQuery, [id]);

    if (result.rowCount === 0) {
      return new Response(
        JSON.stringify({ error: "Search not found" }),
        { status: 404 }
      );
    }

    // If found, return the search fields and worker_type
    const searchDetails = result.rows[0];
    return new Response(JSON.stringify(searchDetails), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching search details:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
