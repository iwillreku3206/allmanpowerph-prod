"use client";

import { Button } from "@/components/form/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";

export default function AdminPage() {
  const router = useRouter();

  return <Sidebar />;
}
