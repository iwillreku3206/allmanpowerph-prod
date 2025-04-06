"use server";

import axios from "axios";
import Tesseract from "tesseract.js";
// @ts-ignore
import * as parser from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// TODO: dumb fix, fix later
// if (!fs.existsSync('./test/data/05-versions-space.pdf'))
//   fs.writeFileSync('./test/data/05-versions-space.pdf', '')

// API Keys for round-robin usage
const API_KEYS = [
  process.env.GEMINI_API_KEY_1 ?? '',
  process.env.GEMINI_API_KEY_2 ?? '',
  process.env.GEMINI_API_KEY_3 ?? '',
  process.env.GEMINI_API_KEY_4 ?? '',
  process.env.GEMINI_API_KEY_5 ?? '',
];

let apiKeyIndex = 0;

// Function to get the next API key in round-robin fashion
const getNextApiKey = () => {
  const key = API_KEYS[apiKeyIndex];
  apiKeyIndex = (apiKeyIndex + 1) % API_KEYS.length; // Move to the next key
  return key;
};

export interface Message {
  role: "user" | "assistant";
  content: string;
}

// Download a file from a URL and return it as a buffer
const downloadFile = async (url: string): Promise<Buffer> => {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return Buffer.from(response.data);
  } catch (err) {
    console.error("Failed to download file:", err);
    throw new Error("File download failed");
  }
};

// Extract text from a PDF using pdf-parse
export const extractTextFromPDF = async (fileUrl: string): Promise<string> => {
  let text = "";

  try {
    // Download the file from the URL
    const pdfBuffer = await downloadFile(fileUrl);

    // Parse the PDF buffer and extract text
    const data = await parser(pdfBuffer);
    text = data.text.trim();

    // If text is extracted, return it
    if (text) {
      return text;
    }
  } catch (err) {
    console.error("Text extraction from PDF failed:", err);
  }

  // If no text found, try OCR using Tesseract.js
  try {
    const { data } = await Tesseract.recognize(fileUrl, "eng", { logger: (m) => console.log(m) });
    return data.text.trim();
  } catch (err) {
    console.error("OCR failed:", err);
    return "";
  }
};

// Analyze resume using Gemini API with round-robin API key selection
export const analyzeResume = async (
  candidateName: string,
  resumeText: string,
  requiredFields: string,
  agencyFee: string,
  salaryRange: string
): Promise<string> => {
  if (!resumeText) {
    return `No Resume of ${candidateName}: No readable text found.`;
  }

  const prompt = `You are an experienced HR with technical expertise in blue-collar industries.
    You will be given a list of maids, and you need to analyze their resumes.
    The ideal candidate should be within these fields: ${requiredFields}.
    Be very very very strict, if a candidate does not meet at least one of the requirements, they should be rejected.
    If the candidate is missing even a single skill, their resume does not explicitly state that they have the skill, or they do not have the relevant experience, they should be rejected.
    The details regarding the skills are not there since many resumes are not in great details.
    Tell me briefly why the field they were missing got them rejected. I don't need a long explanation.
    For those accepted, can you return the requested fields in a JSON format?

    Resume:
    ${resumeText}

    Agency Fees:
    ${agencyFee}

    Monthly Salary Range:
    ${salaryRange}`;

  const apiKey = getNextApiKey(); // Get the next API key
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    return output.toLowerCase().includes("accepted")
      ? `Yes Resume of ${candidateName}: ${output}`
      : `No Resume of ${candidateName}: ${output}`;
  } catch (error) {
    console.error(`Error analyzing Resume of ${candidateName}:`, error, `Api key: ${apiKey}`);
    return `Resume of ${candidateName}: Error - ${(error as any).message}`;
  }
};

// Process a single resume URL
export const processResume = async (
  candidateName: string,
  resumeUrl: string,
  requiredFields: string,
  agencyFee: string,
  salaryRange: string
): Promise<string> => {

  // Extract text from the resume URL
  const resumeText = await extractTextFromPDF(resumeUrl);

  // Analyze the extracted text for the single resume
  const result = await analyzeResume(candidateName, resumeText, requiredFields, agencyFee, salaryRange);

  return result;
};
