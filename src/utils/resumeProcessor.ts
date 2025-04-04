"use server";

import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import axios from 'axios';
import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';
import { GoogleGenerativeAI } from "@google/generative-ai";

// API Keys for round-robin usage
const API_KEYS = [
  "AIzaSyDneLiPbHBi9cr1vyxu1_nFk1T7q6m6Ldo",
  "AIzaSyCqKw_OFL47GN-gegtOZa7J5C-X2xNE0g4",
  "AIzaSyDIGW9FmxmFJPqxzHTOtICv61-0mQC0wX4",
  "AIzaSyCFd5NfxNRWT6dvjErakArBCmr1q9-_c5o",
  "AIzaSyC4qed3gSh-tL4acQvPdfAsPdnlJdmf7B4"
];

export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Download a file from a URL and return it as a buffer
const downloadFile = async (url: string): Promise<Buffer> => {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
  } catch (err) {
    console.error('Failed to download file:', err);
    throw new Error('File download failed');
  }
};

// Extract text from a PDF using pdf-parse
export const extractTextFromPDF = async (fileUrl: string): Promise<string> => {
  let text = '';

  try {
    // Download the file from the URL
    const pdfBuffer = await downloadFile(fileUrl);

    // Parse the PDF buffer and extract text
    const data = await pdfParse(pdfBuffer);
    text = data.text.trim();

    // If text is extracted, return it
    if (text) {
      return text;
    }
  } catch (err) {
    console.error('Text extraction from PDF failed:', err);
  }

  // If no text found, try OCR using Tesseract.js
  try {
    const { data } = await Tesseract.recognize(fileUrl, 'eng', { logger: (m) => console.log(m) });
    return data.text.trim();
  } catch (err) {
    console.error('OCR failed:', err);
    return '';
  }
};

// Analyze resume using Gemini API
export const analyzeResume = async (
  candidateName: string, // Use the candidate name as a string
  resumeText: string,
  requiredFields: string,
  agencyFee: string,
  salaryRange: string
): Promise<string> => {
  if (!resumeText) {
    return `No Resume of ${candidateName}: No readable text found.`;
  }

  const prompt = `You are an experienced HR with technical expertise in blue-collar industries.
    The ideal candidate should be within these fields: ${requiredFields}.
    Be very very very strict, if a candidate does not meet at least one of the requirements, they should be rejected.
    If the candidate is missing even a single skill, their resume does not explicitly state that they have the skill, or they do not have the relevant experience, they should be rejected.
    The details regarding the skills are not there since many resumes are not in great details.
    Tell me briefly why the field they were missing got them rejected. I don't need a long explanation.
    For those accepted, can you give me their name and return the requested fields in a JSON format?

    Resume:
    ${resumeText}

    Agency Fees:
    ${agencyFee}

    Monthly Salary Range:
    ${salaryRange}`;

  try {
    // Adjusting the model call to use streamText (as per `ai-sdk`)
    const genAI = new GoogleGenerativeAI(API_KEYS[0]); // Use the first API key for the request
    const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"}); // Use the appropriate model

    const result = await model.generateContent(prompt)
    const response = await result.response
    const output = await response.text()


    console.log('Response from model:', output); // Log the response to inspect its structure

    // Check if response has the expected property
    // const responseText = response?.data?.text?.trim() || response?.text?.trim() || "No response text available";


    return output.toLowerCase().includes('accepted')
      ? `Yes Resume of ${candidateName}: ${output}`
      : `No Resume of ${candidateName}: ${output}`;
  } catch (error) {
    console.error(`Error analyzing Resume of ${candidateName}:`, error);
    return `Resume of ${candidateName}: Error - ${(error as any).message}`;
  }
};

// Process a single resume URL
export const processResume = async (
  candidateName: string, // Use the candidate name as a string
  resumeUrl: string,  // URL to the resume
  requiredFields: string,
  agencyFee: string,
  salaryRange: string
): Promise<string> => {
  console.log("Processing a single resume!");

  // Extract text from the resume URL
  const resumeText = await extractTextFromPDF(resumeUrl);

  // Analyze the extracted text for the single resume
  const result = await analyzeResume(candidateName, resumeText, requiredFields, agencyFee, salaryRange);

  console.log("Resume processed:", result);

  return result;
};
