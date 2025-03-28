import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbPool } from "@/lib/db";

export async function secureAdminHandler(req: Request, handler: Function) {
  const session = await getServerSession(authOptions);


  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await dbPool.query(
      "SELECT * FROM next_auth.users WHERE email = $1",
      [session.user.email]
    );


    if (result.rowCount === 0 || !result.rows[0].is_authorized) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Call the actual handler if user is authorized
    return await handler(req);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
