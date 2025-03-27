"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded"
    >
      Sign Out
    </button>
  );
}
