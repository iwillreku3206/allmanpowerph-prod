"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  candidateAssignmentPath?: string;
}

export default function Sidebar({
}: SidebarProps) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-primary text-white flex flex-col p-4 border-r border-gray-700">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      {/* Candidate Assignment Button */}
      <button
        onClick={() => router.push("/dsahbh213iocscdas2/ysdsaygfiagfafas")}
        className="mb-4 px-4 py-2 bg-white text-black hover:bg-gray-200 transition rounded"
      >
        Candidate Assignment
      </button>

      {/* Sign Out Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-auto px-4 py-2 bg-white text-black hover:bg-gray-200 transition rounded"
      >
        Sign Out
      </button>
    </div>
  );
}
