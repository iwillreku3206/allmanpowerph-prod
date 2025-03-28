"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchCandidates() {
  const router = useRouter();
  const [searches, setSearches] = useState([]);
  const [page, setPage] = useState(1); // Store current page
  const [totalPages, setTotalPages] = useState(1); // Store total pages

  // Fetch data when the page changes
  useEffect(() => {
    async function fetchSearches() {
      const res = await fetch(`/api/admin/get-searches?page=${page}`);
      const data = await res.json();
      setSearches(data.searches);
      setTotalPages(data.totalPages); // Get total pages from API
    }

    fetchSearches();
  }, [page]); // Re-fetch when page changes

  return (
    <div className="flex">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="ml-64 p-4 w-full">
        <h1 className="text-xl font-bold mb-4">Candidate Searches</h1>

        {/* Table */}
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Fields</th>
            </tr>
          </thead>
          <tbody>
            {searches.map((search, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{search.email}</td>
                <td className="border p-2">{search.location}</td>
                <td className="border p-2">{JSON.stringify(search.fields)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="px-4 py-2">Page {page} of {totalPages}</span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
