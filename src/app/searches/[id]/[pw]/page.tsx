"use server";

import { dbPool } from "@/lib/db";
import { Search } from "@/types/search";
import { redirect } from "next/navigation";
import { QueryResult, QueryResultRow } from "pg";
import argon2 from "argon2";
import { cookies } from "next/headers";
import crypto from "crypto";
import { SearchSession } from "@/types/searchSession";
import { InputServer } from "@/components/inputServer";
import { Title } from "@/components/ui/title";
import { ButtonServer } from "@/components/buttonServer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; pw?: string }>;
}) {
  const urlParams = await params;
  let searchQuery: QueryResult<Search>;

  try {
    searchQuery = await dbPool.query<Search>(
      "SELECT * FROM searches WHERE id = $1 LIMIT 1",
      [urlParams.id]
    );
  } catch (e) {
    redirect("/404");
  }

  if (searchQuery.rowCount !== 1) {
    redirect("/404");
  }

  let searchSession: QueryResult<SearchSession> | undefined = undefined;

  try {
    const cookie = await cookies();
    const token = cookie.get(`session-search-${urlParams.id}`)?.value;
    if (token) {
      searchSession = await dbPool.query<SearchSession>(
        "SELECT * FROM search_sessions WHERE session_token = $1 AND search = $2 LIMIT 1",
        [token, urlParams.id]
      );
    }
  } catch (e) {}

  if (searchSession && searchSession?.rowCount === 1) {
    redirect(`https://allmaidsph.com/searches/${urlParams.id}/protected`);
  }

  async function auth(formData: FormData) {
    "use server";
    const password = formData.get("password");

    const pwOk = await argon2.verify(
      searchQuery.rows[0].password_hash,
      password?.toString() || ""
    );
    if (!pwOk) {
      redirect(
        `https://allmaidsph.com/searches/${urlParams.id}?error=invalidcredentials`
      );
    }

    const sessionKey = crypto.randomBytes(32).toString("hex");

    await dbPool.query(
      "INSERT INTO search_sessions(search, session_token, expires) VALUES ($1, $2, $3)",
      [
        urlParams.id,
        sessionKey,
        new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      ]
    );
    (await cookies()).set(`session-search-${urlParams.id}`, sessionKey, {
      maxAge: 24 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    redirect(`https://allmaidsph.com/searches/${urlParams.id}/protected`);
  }
  return (
    <main className="min-h-screen bg-[#1A1A1A] text-white flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Title />

      <form action={auth} className="flex flex-col gap-4 items-center w-full">
        <InputServer
          type="password"
          name="password"
          value={urlParams.pw}
          className="md:w-[400px]  w-full"
          placeholder="Enter password"
        />
        <ButtonServer className="bg-primary md:w-[360px]  w-full" type="submit">
          Submit
        </ButtonServer>
      </form>
      <br />

      {/* Contact info */}
      <div className="text-center text-sm text-gray-400">
        Questions or concerns? Call us at:
        <br />
        <span className="font-medium text-white">09620900909</span>
      </div>
    </main>
  );
}
