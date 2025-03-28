"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/app/dsahbh213iocscdas2/components/Sidebar";

export default function AssignApplicants() {
  const router = useRouter();
  const [user, setUser] = useState([]);
  const [connection, setConnection] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: search_id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [newCandidateData, setNewCandidateData] = useState({}); // State to store new candidate data
  const [assignedCandidates, setAssignedCandidates] = useState([]); // State to store assigned candidates
  const [kvp, setKvp] = useState({}); // State to store key-value pairs
  const [isLoadingModal, setIsLoadingModal] = useState(false); // Loading state for modal

  // Fetch user data when search_id changes
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/get-applicant?user_id=${search_id}`);
        const res2 = await fetch(`/api/admin/get-connections?user_id=${search_id}`);
        const data = await res.json();
        const data2 = await res2.json();
        setUser(data.applicant);
        setConnection(data2.connections)

        if (data.applicant && data.applicant.length > 0) {
          const userData = data.applicant[0];

          // Extract key-value pairs from the fields column
          const keyValuePairs = userData.fields.reduce((acc: any, { key, value }: any) => {
            acc[key] = value;
            return acc;
          }, {});

          // Store the key-value pairs in the state
          setKvp(keyValuePairs);
          console.log(keyValuePairs); // Log the extracted key-value pairs
        }

        console.log("hello", data2.connections)
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (search_id) {
      fetchUser();
    }
  }, [search_id]);

  // Fetch assigned candidates when modal opens
  useEffect(() => {
    if (isModalOpen && search_id) {
      async function fetchAssignedCandidates() {
        setIsLoadingModal(true); // Set loading state to true
        try {
          const res = await fetch(`/api/admin/get-assigned-candidates`);
          const data = await res.json();
          setAssignedCandidates(data.assignedCandidates || []);
        } catch (error) {
          console.error("Failed to fetch assigned candidates:", error);
        } finally {
          setIsLoadingModal(false); // Set loading state to false after fetching
        }
      }

      fetchAssignedCandidates();
    }
  }, [isModalOpen, search_id]);

  // Handle form field change for new candidate data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCandidateData({
      ...newCandidateData,
      [name]: value,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/delete-candidate?candidate_id=${id}`, {
        method: "DELETE",
      });

      // Check if response is empty
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      if (res.ok && data.success) {
        setConnection(connection.filter(candidate => candidate.id !== id));
      } else {
        console.error("Failed to delete candidate:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };


  // Modal form submission handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingModal(true); // Set loading state to true during submission

    console.log("Assigning");

    try {
      const candidateData = {
        ...newCandidateData,
        assignedCandidateId: newCandidateData.assignedCandidate, // Add assigned candidate ID
      };

      // POST request to API with search_id and candidate data
      const res = await fetch(`/api/admin/assign-candidate?search_id=${search_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidateData),
      });

      const data = await res.json();
      if (data.success) {
        console.log("New candidate added!", data);

        // Refetch connections data
        const res2 = await fetch(`/api/admin/get-connections?user_id=${search_id}`);
        const data2 = await res2.json();
        setConnection(data2.connections);
      } else {
        console.error("Failed to assign candidate", data.error);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsLoadingModal(false); // Set loading state to false after submission
      setIsModalOpen(false); // Close modal after submission
    }
  };



  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed inset-y-0 left-0 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 ml-80 p-6">
        <h1 className="text-2xl font-bold mb-6">
          Assign Candidates for {user.length > 0 ? user[0].email : "N/A"}
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
              Assign Candidate
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    {/* Dynamically extract column names from setConnection */}
                    {connection.length > 0 &&
                      Object.keys(connection[0].fields).map((key, index) => (
                        <th key={index} className="py-2 px-4 border-b text-left">{key}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {connection.length > 0 ? (
                    connection.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="py-2 px-4 border-b">{candidate.id}</td>
                        {/* Extract field values dynamically */}
                        {Object.keys(candidate.fields).map((key, index) => (
                          <td key={index} className="py-2 px-4 border-b">{candidate.fields[key]}</td>
                        ))}
                        <td className="py-2 px-4 border-b">
                          <button
                            onClick={() => handleDelete(candidate.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="py-2 px-4 text-center">
                        No candidates available.
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
            {isLoadingModal ? (
              <div className="flex justify-center items-center h-40">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Assigned Candidates</label>
                  <select
                    name="assignedCandidate"
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded"
                    required
                  >
                    <option value="">Select a candidate</option>
                    {assignedCandidates.map((candidate) => (
                      <option key={candidate.id} value={candidate.id}>
                        {candidate.name}
                      </option>
                    ))}
                  </select>
                </div>

                {user.length > 0 && user[0].fields.map((field, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{field.key} ({field.value})</label>
                    <input
                      type="text"
                      name={field.key}
                      value={newCandidateData[field.key] || ""}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                ))}


                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
