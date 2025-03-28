import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { secureAdminHandler } from "@/lib/adminAuth"; // Adjust path if needed

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = 10; // 10 candidates per page
    const offset = (page - 1) * limit;

    try {
      const result = await dbPool.query(
        "SELECT id, name FROM candidates ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      const totalCountRes = await dbPool.query("SELECT COUNT(*) FROM candidates");
      const totalCount = parseInt(totalCountRes.rows[0].count, 10);
      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json({
        candidates: result.rows,
        totalPages,
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  });
}
export async function POST(req: Request) {
    return secureAdminHandler(req, async () => {
      try {
        const { search_id, candidates } = await req.json();
  
        console.log("Received:", { search_id, candidates });
  
        if (!search_id || !Array.isArray(candidates)) {
          return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
  
        // Fetch currently assigned candidates
        const currentResult = await dbPool.query(
          "SELECT candidate_id FROM connections WHERE search_id = $1",
          [search_id]
        );
        const currentCandidates = currentResult.rows.map(row => row.candidate_id);
  
        // Determine candidates to add (new selections) and remove (unchecked)
        const toAdd = candidates.filter(id => !currentCandidates.includes(id));
        const toRemove = currentCandidates.filter(id => !candidates.includes(id));
  
        console.log("To Add:", toAdd);
        console.log("To Remove:", toRemove);
  
        // Insert new candidates (preventing duplicates)
        if (toAdd.length > 0) {
          const values = toAdd.map(id => `('${id}', '${search_id}')`).join(",");
          await dbPool.query(
            `INSERT INTO connections (candidate_id, search_id) VALUES ${values} ON CONFLICT DO NOTHING`
          );
        }
  
        // Remove unchecked candidates
        if (toRemove.length > 0) {
          await dbPool.query(
            `DELETE FROM connections WHERE search_id = $1 AND candidate_id = ANY($2)`,
            [search_id, toRemove]
          );
        }
  
        return NextResponse.json({ message: "Candidates updated successfully" }, { status: 200 });
  
      } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
      }
    });
  }