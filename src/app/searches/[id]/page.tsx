"use server";

import { dbPool } from "@/lib/db";
import { Search } from "@/types/search";
import { redirect } from "next/navigation";
import { QueryResult, QueryResultRow } from "pg";
import argon2 from 'argon2'


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const urlParams = await params
  // check if search exists

  let searchQuery: QueryResult<Search>

  try {
    searchQuery = await dbPool.query<Search>("SELECT * FROM searches WHERE id = $1 LIMIT 1", [urlParams.id])
  } catch (e) {
    redirect('/404')
  }

  if (searchQuery.rowCount !== 1) {
    redirect('/404')
  }

  async function auth(formData: FormData) {
    "use server"
    const password = formData.get("password")

    const pwOk = await argon2.verify(searchQuery.rows[0].password_hash, password?.toString() || '')
    if (!pwOk)
      redirect(`/searches/${urlParams.id}?error=invalidcredentials`)
    redirect(`/searches/${urlParams.id}/protected`)
  }
  return (
    <main className="bg-[#101419]">
      <form action={auth}>
        <input type="password" name="password" id="password" /><button type="submit">submit</button>
      </form>
    </main>
  )
}
