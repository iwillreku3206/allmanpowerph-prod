"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Sidebar from "@/app/dsahbh213iocscdas2/components/Sidebar";

export default function AssignCandidates() {
  const router = useRouter();
  const { search_id } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const res = await fetch(`/api/admin/get-candidates`);
        const data = await res.json();
        setCandidates(data.candidates);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCandidates();
  }, []);

  const handleCheckboxChange = (candidateId) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleSubmit = async () => {
    await fetch(`/api/admin/assign-candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search_id, candidates: selectedCandidates }),
    });

    alert("Candidates assigned successfully!");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (fixed width) */}
      <div className="w-64 fixed inset-y-0 left-0 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main Content (pushed to the right of the sidebar) */}
      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold mb-6">Assign Candidates to Search {search_id}</h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 shadow-md rounded">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Select</th>
                  <th className="p-3 border">ID</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Agency</th>
                  <th className="p-3 border">Resume</th>
                </tr>
              </thead>
              <tbody>
                {candidates.length > 0 ? (
                  candidates.map((candidate) => (
                    <tr key={candidate.id} className="text-left">
                      <td className="p-3 border text-center">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.includes(candidate.id)}
                          onChange={() => handleCheckboxChange(candidate.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-3 border">{candidate.id}</td>
                      <td className="p-3 border">{candidate.name}</td>
                      <td className="p-3 border">{candidate.agency_id || "N/A"}</td>
                      <td className="p-3 border">
                        {candidate.resume_url ? (
                          <a
                            href={candidate.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Resume
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No candidates available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && (
          <button
            onClick={handleSubmit}
            className="mt-6 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Assign Selected
          </button>
        )}
      </div>
    </div>
  );
}
