"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/app/dsahbh213iocscdas2/components/Sidebar";

export default function AssignApplicants() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: search_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    async function fetchApplicants() {
      try {
        const res = await fetch(`/api/admin/get-applicant?user_id=${search_id}`);
        const data = await res.json();
        setUser(data.applicant);  
        console.log(data.applicant)
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    }

    if (search_id) { 
      fetchApplicants();
    }
  }, [search_id]);

  // Extract unique keys from all the candidates' fields
  const fieldKeys = Array.from(
    new Set(
      user.flatMap((candidate) =>
        candidate.fields.map((field) => field.key)
      )
    )
  );

  const candidates = [];

  // Handle modal form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the new candidate form
    console.log("New candidate added!");
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed inset-y-0 left-0 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Assign Candidates for {candidates.length > 0 ? candidates[0].email : "N/A"}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsModalOpen(true)} // Open modal on button click
              className="mb-4 px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Candidate
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    {fieldKeys.map((key, index) => {
                      const values = Array.from(new Set(user.flatMap((candidate) =>
                        candidate.fields.filter((field) => field.key === key).map((field) => field.value)
                      )));
                      return (
                        <th key={index} className="py-2 px-4 border-b text-left">
                          {key} ({values.join(", ")})
                        </th>
                      );
                    })}
                    <th className="py-2 px-4 border-b text-left">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="py-2 px-4 border-b">{candidate.id}</td>
                        {fieldKeys.map((key) => {
                          const field = candidate.fields.find(f => f.key === key);
                          return (
                            <td key={key} className="py-2 px-4 border-b">
                              {field ? field.value : "-"}
                            </td>
                          );
                        })}
                        <td className="py-2 px-4 border-b">
                          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            View Resume
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={fieldKeys.length + 2} className="py-2 px-4 text-center">
                        No candidates assigned.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Add Candidate</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Enter candidate's name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 p-2 w-full border rounded"
                  placeholder="Enter candidate's email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  className="mt-1 p-2 w-full border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close modal
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
