"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/button";
import { Select } from "@/components/select";
import { Input } from "@/components/input";

export default function SearchCandidates() {
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [agencies, setAgencies] = useState([]);

  // Form data sht
  const [file, setFile] = useState<{
    fileName: string;
    fileData: File | null;
  } | null>(null);
  const [name, setName] = useState("");
  const [agencyId, setAgencyId] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    // Show open file picker
    setLoading(true);
    const selection = e.target.files;
    const fileName = selection?.length ? selection[0].name : "";
    const fileData = selection?.length ? selection[0] : null;

    // Get file selected
    setFile({ fileName, fileData });
    setLoading(false);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgencyIdChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    setAgencyId(e.target.value);
  };

  const handleUpload = async () => {
    // No file selected
    if (!file) return setError("Please select a file first.");

    // Wait for process to finish
    if (loading || uploading) return;

    // Uploading in progress
    setUploading(true);

    // Create the form data
    const formData = new FormData();
    formData.append("fileName", file.fileName);
    formData.append("fileData", file.fileData as File);
    formData.append("name", name);
    formData.append("agencyId", agencyId);

    // const { data, error } = await
    const { error } = await (
      await fetch("/api/admin/create-candidate", {
        method: "POST",
        body: formData,
      })
    ).json();

    // Done
    setUploading(false);

    // Upload failed
    if (error) {
      setError(error);
      alert("Upload failed!");

      // Upload success
    } else {
      alert("File uploaded successfully!");
    }
  };

  // Get agencies
  useEffect(() => {
    fetch("/api/admin/get-agencies")
      .then((r) => r.json())
      .then(({ agencies }) => (setAgencies(agencies), agencies));
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-80 p-8 w-full">
        <h1 className="text-header-2">Resume Upload</h1>
        <br />

        <div className="flex justify-center items-center">
          <div className="p-4 border rounded-md w-1/2">
            <h1 className="text-header-2">Candidate Information Form</h1>
            <br />
            Select an agency:
            <br />
            <Select
              className="w-full"
              data={agencies}
              onInput={handleAgencyIdChange}
            ></Select>
            <br />
            <br />
            Enter full candidate name:
            <Input className="w-full" onChange={handleNameChange}></Input>
            <br />
            <br />
            Select candidate resume file:
            <input type="file" onChange={handleFileChange} />
            <br />
            <div className="text-red-500">{error}</div>
            <br />
            <Button
              onClick={handleUpload}
              className="bg-blue-500 text-white p-3 rounded mt-2"
            >
              {uploading
                ? "Uploading..."
                : loading
                  ? "Reading file..."
                  : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
