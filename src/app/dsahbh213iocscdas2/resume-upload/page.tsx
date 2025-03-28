"use client";

import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Button } from "@/components/button";

export default function SearchCandidates() {
  const [ page, setPage ] = useState(1);
  const [ file, setFile ] = useState(null);
  const [ error, setError ] = useState('');
  const [ loading, setLoading ] = useState(false);
  const [ uploading, setUploading ] = useState(false);

  const handleFileChange = async () => {

    // Show open file picker
    setLoading(true);
    const selection = await window.showOpenFilePicker();
    const fileName = selection.length ? selection[0].name : '';
    const fileData = selection.length ? await selection[0].getFile() : null;

    // Get file selected
    setFile({ fileName, fileData });
    setLoading(false);
  };

  const handleUpload = async () => {
    
    // No file selected
    if (!file) 
      return setError('Please select a file first.');

    // Wait for process to finish
    if (loading || uploading)
      return; 

    // Uploading in progress
    setUploading(true);

    // Create the form data
    const formData = new FormData();
    formData.append('fileName', file.fileName);
    formData.append('fileData', file.fileData)

    // const { data, error } = await 
    // ! todo, find api for uploading to s3 bucket
    const { error } = await fetch('/api/admin/upload-resume', {
      method: 'POST',
      body: formData
    });

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

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-80 p-8 w-full">
        <h1 className="text-header-2">Resume Upload</h1>
        <br />

        <div className="flex justify-center items-center h-64">
          <div className="p-4 border rounded-md w-1/2">
            <Button 
              className="bg-blue-500 text-white p-3 rounded mt-2"
              onClick={ handleFileChange }> 
              Choose file.
            </Button>
            <div className="text-primary-foreground font-inputfont flex flex-row justify-center py-4">
              Selected: <br />
              { file?.fileName ?? 'none' }
            </div>
            <br />
            <div className="text-red-500">{ error }</div>
            <br />
            <Button
              onClick={ handleUpload }
              className="bg-blue-500 text-white p-3 rounded mt-2">
              { uploading ? "Uploading..." : loading ? "Reading file..." : "Upload" }
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
