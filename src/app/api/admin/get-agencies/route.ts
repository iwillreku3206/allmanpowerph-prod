import { NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { secureAdminHandler } from "@/lib/adminAuth"; // Adjust path if needed

export async function GET(req: Request) {
  return secureAdminHandler(req, async () => {
    try {

      // Fetch agency records
      const result = await dbPool.query('SELECT id,name FROM agencies');
      return NextResponse.json({
        agencies: result.rows,
      });
    } catch (error) {
      console.error("Error fetching applicant:", error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }
  });
}