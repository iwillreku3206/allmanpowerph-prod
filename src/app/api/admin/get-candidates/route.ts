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
