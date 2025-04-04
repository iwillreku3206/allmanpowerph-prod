import { promises as fs } from 'fs';
import axios from 'axios';
import Tesseract from 'tesseract.js';
import pdfParse from 'pdf-parse';

// API Keys for round-robin usage
const API_KEYS = [
  process.env.GEMINI_API_KEY_1!,
  process.env.GEMINI_API_KEY_2!,
  process.env.GEMINI_API_KEY_3!,
  process.env.GEMINI_API_KEY_4!,
  process.env.GEMINI_API_KEY_5!,
];

// Extract text from a PDF using pdf-parse
const extractTextFromPDF = async (filePath: string): Promise<string> => {
  let text = '';
  
  try {
    // Read the PDF
    const pdfBuffer = await fs.readFile(filePath);
    const data = await pdfParse(pdfBuffer);
    text = data.text.trim();
    
    if (text) {
      return text;
    }
  } catch (err) {
    console.error('Text extraction from PDF failed:', err);
  }

  // If no text found, try OCR using Tesseract.js
  try {
    const { data } = await Tesseract.recognize(filePath, 'eng', { logger: (m) => console.log(m) });
    return data.text.trim();
  } catch (err) {
    console.error('OCR failed:', err);
    return '';
  }
};

// Analyze resume using Gemini API
const analyzeResume = async (index: number, resumeText: string, requiredFields: string, agencyFee: string, salaryRange: string, careType: string = 'household_help'): Promise<string> => {
  if (!resumeText) {
    return `❌ Resume ${index + 1}: No readable text found.`;
  }

  const apiKey = API_KEYS[index % API_KEYS.length];
  const prompt = `
    You are an experienced HR with technical expertise in blue-collar industries. The ideal candidate should be within these fields: ${requiredFields}.
    Be strict, if a candidate does not meet the requirements, they should be rejected.
    The details regarding the skills are missing in this resume, but that's okay. Focus on key missing skills to assess.
    Resume: ${resumeText}
    Agency Fees: ${agencyFee}
    Monthly Salary Range: ${salaryRange}
    Care Type: ${careType}
  `;

  try {
    const response = await axios.post('https://api.google.com/generativeai', { prompt }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });
    const responseText = response.data.text.trim();
    return responseText.toLowerCase().includes('accepted')
      ? `✅ Resume ${index + 1}: ${responseText}`
      : `❌ Resume ${index + 1}: ${responseText}`;
  } catch (error) {
    console.error(`Error analyzing Resume ${index + 1}:`, error);
    return `⚠️ Resume ${index + 1}: Error - ${(error as any).message}`;
  }
};

const processResumes = async (filePaths: string[], requiredFields: string, agencyFee: string, salaryRange: string) => {
  const extractedTexts = await Promise.all(filePaths.map(async (filePath, index) => {
    const text = await extractTextFromPDF(filePath);
    return { index, text };
  }));

  const analysisResults = await Promise.all(extractedTexts.map(async ({ index, text }) => {
    return await analyzeResume(index, text, requiredFields, agencyFee, salaryRange);
  }));

  return analysisResults;
};


// (async () => {
//     const filePaths = ['./resume1.pdf', './resume2.pdf']; // Replace with actual file paths
//     const requiredFields = 'cooking, cleaning, gardening'; // Example required fields
//     const agencyFee = 'Php 10000';
//     const salaryRange = 'Php 10000 - Php 15000';
  
//     const results = await processResumes(filePaths, requiredFields, agencyFee, salaryRange);
//     console.log('Resume Analysis Results:', results);
//   })();