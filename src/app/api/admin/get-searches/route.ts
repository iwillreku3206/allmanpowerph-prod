import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { secureAdminHandler } from "@/lib/adminAuth";

export async function GET(req) {
  return secureAdminHandler(req, async () => {
    try {
      const result = await dbPool.query(
        "SELECT id, email, location, fields FROM searches ORDER BY id DESC LIMIT 10"
      );

      return NextResponse.json({ searches: result.rows }, { status: 200 });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  });
}
