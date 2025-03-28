import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";

export async function GET(req) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 10; // 10 results per page
  const offset = (page - 1) * limit;

  try {
    const result = await dbPool.query(
      "SELECT * FROM searches ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    const totalCountRes = await dbPool.query("SELECT COUNT(*) FROM searches");
    const totalCount = parseInt(totalCountRes.rows[0].count, 10);
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      searches: result.rows,
      totalPages,
    });
  } catch (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
