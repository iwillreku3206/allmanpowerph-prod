import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { secureAdminHandler } from "@/lib/adminAuth";

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    try {
      // Query to fetch all candidates
      const assignedCandidates = await dbPool.query(
        "SELECT * FROM candidates"
      );


      if (assignedCandidates.rows.length === 0) {
        return NextResponse.json({ message: "No candidates assigned." }, { status: 404 });
      }

      return NextResponse.json({ assignedCandidates: assignedCandidates.rows });
    } catch (error) {
      console.error("Error fetching assigned candidates:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  });
}
