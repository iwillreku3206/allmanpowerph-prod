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
  const [newCandidateData, setNewCandidateData] = useState({}); // State to store new candidate data
  const [resume, setResume] = useState(null); // State to store resume file
  const [assignedCandidates, setAssignedCandidates] = useState([]); // State to store assigned candidates
  const [kvp, setKvp] = useState({}); // State to store key-value pairs

  // Fetch user data when search_id changes
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`/api/admin/get-applicant?user_id=${search_id}`);
        const data = await res.json();
        setUser(data.applicant);

        if (data.applicant && data.applicant.length > 0) {
          const userData = data.applicant[0];

          // Extract key-value pairs from the fields column
          const keyValuePairs = userData.fields.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
          }, {});

          // Store the key-value pairs in the state
          setKvp(keyValuePairs);
          console.log(keyValuePairs); // Log the extracted key-value pairs
        }
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
        try {
          const res = await fetch(`/api/admin/get-assigned-candidates`);
          const data = await res.json();
          setAssignedCandidates(data.assignedCandidates || []);
        } catch (error) {
          console.error("Failed to fetch assigned candidates:", error);
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

  // Handle file change for resume upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file); // Save the file to the state
  };

  // Handle modal form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the new candidate form, including the resume
    console.log("New candidate added!", newCandidateData);
    console.log("Resume file:", resume);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed inset-y-0 left-0 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 p-6">
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
              Add Candidate
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">ID</th>
                    <th className="py-2 px-4 border-b text-left">Candidate Name</th>

                    {/* Add dynamic columns based on the fields */}
                    {user.length > 0 && user[0].fields.map((field, index) => (
                      <th key={index} className="py-2 px-4 border-b text-left">{field.key}</th>
                    ))}
                    <th className="py-2 px-4 border-b text-left">Resume</th>
                  </tr>
                </thead>
                <tbody>
                  {assignedCandidates.length > 0 ? (
                    assignedCandidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="py-2 px-4 border-b">{candidate.id}</td>
                        <td className="py-2 px-4 border-b">{candidate.name}</td>

                        {/* Display the value for each field */}
                        {user.length > 0 && user[0].fields.map((field, index) => (
                          <td key={index} className="py-2 px-4 border-b">{field.value}</td>
                        ))}

                        <td className="py-2 px-4 border-b">
                          {/* If resume URL exists, link it, otherwise show "No Resume" */}
                          {candidate.resume ? (
                            <a
                              href={candidate.resume}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View Resume
                            </a>
                          ) : (
                            "No Resume"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3 + (user.length > 0 ? user[0].fields.length : 0)} className="py-2 px-4 text-center">
                        No assigned candidates to display.
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
              {/* Dropdown to select an assigned candidate */}
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

              {/* Dynamic Fields */}
              {user.length > 0 &&
                user[0].fields.map((field, index) => (
                  <div key={index} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">{field.key}</label>
                    <input
                      type="text" // Assuming text input, change based on field type
                      name={field.key}
                      value={newCandidateData[field.key] || ""}
                      onChange={handleInputChange}
                      className="mt-1 p-2 w-full border rounded"
                      required
                    />
                  </div>
                ))}

              {/* Resume Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange} // Handle resume file change
                  className="mt-1 p-2 w-full border rounded"
                  required
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
