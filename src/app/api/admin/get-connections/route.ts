import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { secureAdminHandler } from "@/lib/adminAuth"; // Adjust path if needed

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    const url = new URL(req.url);
    const user_id = url.searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 });
    }

    try {
      // Fetch the records based on user_id
      const currentResult = await dbPool.query(
        "SELECT * FROM connections WHERE user_id = $1",
        [user_id]
      );

      return NextResponse.json({
        connections: currentResult.rows,
      });
    } catch (error) {
      console.error("Error fetching applicant:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  });
}