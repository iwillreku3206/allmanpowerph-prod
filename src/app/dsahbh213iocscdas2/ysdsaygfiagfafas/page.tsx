"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function SearchCandidates() {
  const router = useRouter();
  const [searches, setSearches] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSearches() {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/get-searches?page=${page}`);
        const data = await res.json();
        setSearches(data.searches || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Failed to fetch searches:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSearches();
  }, [page]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-80 p-8 w-full">
        <h1 className="text-header-2">Candidate Search Requests</h1>
        <br />

        {/* Loading Screen */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-3">Search ID</th>
                    <th className="border p-3">Email</th>
                    <th className="border p-3">Location</th>
                    <th className="border p-3">Status</th>
                    <th className="border p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searches.length > 0 ? (
                    searches.map((search: any) => (
                      <tr key={search.id} className="border">
                        <td className="border p-3">{search.id}</td>
                        <td className="border p-3">{search.email}</td>
                        <td className="border p-3">{search.location}</td>
                        <td className="border p-3">
                          {JSON.stringify(search.fields)}
                        </td>
                        <td className="border p-3">
                          <button
                            onClick={() =>
                              router.push(
                                `/dsahbh213iocscdas2/ysdsaygfiagfafas/assign/${search.id}`
                              )
                            }
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Assign Candidate
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-gray-500">
                        No searches found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>

              <span className="px-4 py-2">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
