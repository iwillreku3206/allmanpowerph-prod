import { NextRequest, NextResponse } from "next/server";
import { dbPool } from "@/lib/db";
import { secureAdminHandler } from "@/lib/adminAuth";

export async function DELETE(req: NextRequest) {
    return secureAdminHandler(req, async () => {
        try {
            const url = new URL(req.url);
            const id = url.searchParams.get("candidate_id");

            // Fix: Check if candidate_id is missing
            if (!id) {
                return NextResponse.json({ error: "candidate_id is required" }, { status: 400 });
            }

            console.log(`Deleting connection with ID: ${id}`);

            // Execute DELETE query
            const result = await dbPool.query("DELETE FROM connections WHERE id = $1", [id]);

            // Fix: Ensure a candidate was actually deleted
            if (result.rowCount === 0) {
                return NextResponse.json({ error: "Connection not found" }, { status: 404 });
            }

            console.log(`Connection ${id} deleted successfully`);
            return NextResponse.json({ success: true, message: "Connection deleted successfully" });

        } catch (error) {
            console.error("Error deleting candidate:", error);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    });
}
