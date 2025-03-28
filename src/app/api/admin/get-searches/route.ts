import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { secureAdminHandler } from "@/lib/adminAuth";

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    try {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get("page") || "1", 10);
      const limit = 10;
      const offset = (page - 1) * limit;

      // Fetch searches with pagination
      const result = await dbPool.query(
        "SELECT id, email, location, fields FROM searches ORDER BY id DESC LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      // Get total count of searches
      const totalCountRes = await dbPool.query("SELECT COUNT(*) FROM searches");
      const totalCount = parseInt(totalCountRes.rows[0].count, 10);
      const totalPages = Math.ceil(totalCount / limit);

      return NextResponse.json(
        {
          searches: result.rows,
          totalPages,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });
}
