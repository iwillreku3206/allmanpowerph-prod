import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { secureAdminHandler } from "@/lib/adminAuth";

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    const url = new URL(req.url);
    const search_id = url.searchParams.get("search_id");

    if (!search_id) {
      return NextResponse.json({ error: "Missing search_id" }, { status: 400 });
    }

    try {
      const assignedCandidates = await dbPool.query(
        "SELECT candidate_id FROM connections WHERE search_id = $1",
        [search_id]
      );

      return NextResponse.json({ assignedCandidates: assignedCandidates.rows });
    } catch (error) {
      console.error("Error fetching assigned candidates:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  });
}
