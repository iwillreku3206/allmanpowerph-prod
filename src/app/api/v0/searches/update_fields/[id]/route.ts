import { dbPool } from "@/lib/db";
import { NextRequest } from "next/server";

// Update the `fields` column in the `searches` table and delete connections with the same `id` in `user_id`
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { fields } = body;

    console.log(id);
    console.log(fields);

    if (!Array.isArray(fields)) {
      return new Response(
        JSON.stringify({ error: "Invalid fields format" }),
        { status: 400 }
      );
    }

    // Start a transaction to ensure both queries are executed together
    await dbPool.query("BEGIN");

    // Update the `fields` column in `searches`
    const updateQuery = `
      UPDATE searches
      SET fields = $1
      WHERE id = $2;
    `;
    await dbPool.query(updateQuery, [JSON.stringify(fields), id]);

    // Delete all records in `connections` where `user_id` matches `id`
    const deleteQuery = `
      DELETE FROM connections
      WHERE user_id = $1;
    `;
    await dbPool.query(deleteQuery, [id]);

    // Commit the transaction
    await dbPool.query("COMMIT");

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Rollback the transaction in case of an error
    await dbPool.query("ROLLBACK");
    console.error("Error updating search fields and deleting connections:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
