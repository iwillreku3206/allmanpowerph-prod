"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SearchCandidates() {
  const router = useRouter();
  const [searches, setSearches] = useState([]);

  // Fetch search data from API
  useEffect(() => {
    async function fetchSearches() {
      try {
        const res = await fetch("/api/admin/get-searches");
        if (!res.ok) throw new Error("Failed to fetch searches");
        const data = await res.json();
        setSearches(data.searches);
      } catch (error) {
        console.error("Error fetching searches:", error);
      }
    }
    fetchSearches();
  }, []);

  return (
    <div className="flex">
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

      {/* Display Search Results */}
      <div className="ml-72 p-6">
        <h1 className="text-2xl font-bold mb-4">Recent Searches</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Fields</th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search) => (
                <tr key={search.id} className="border">
                  <td className="p-2 border">{search.email}</td>
                  <td className="p-2 border">{search.location}</td>
                  <td className="p-2 border">
                    {JSON.stringify(search.fields)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
