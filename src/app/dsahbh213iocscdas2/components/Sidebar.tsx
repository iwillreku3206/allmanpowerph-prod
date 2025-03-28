"use client";

import { Button } from "@/components/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  candidateAssignmentPath?: string;
}

export default function Sidebar({
}: SidebarProps) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-primary text-white flex flex-col p-4">
      <h2 className="text-header-1 my-6">Admin Panel</h2>

      {/* Candidate Assignment Button */}
      <Button
        className="mb-4 px-4 py-3 bg-white text-black hover:bg-gray-200 transition rounded"
        onClick={() => router.push("/dsahbh213iocscdas2/ysdsaygfiagfafas")}
      >
        Candidate Assignment
      </Button>
      <Button
        className="mb-4 px-4 py-3 bg-white text-black hover:bg-gray-200 transition rounded"
        onClick={() => router.push("/dsahbh213iocscdas2/create-candidate")}
      >
        Register Candidate
      </Button>

      {/* Sign Out Button */}
      <Button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-auto px-4 py-2 bg-white text-black hover:bg-gray-200 transition rounded"
      >
        Sign Out
      </Button>
    </div>
  );
}
