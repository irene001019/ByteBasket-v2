"use client";

import React, { useState } from "react";
import Tesseract from "tesseract.js";
import ReceiptLayout from "@/app/dashboard/receipt/layout"; // Adjust the path if necessary

const ReceiptPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [totalCost, setTotalCost] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setTotalCost(""); // Reset Total Cost on new upload
    }
  };

  const handleScanReceipt = async (): Promise<void> => {
    if (!selectedFile) {
      alert("Please upload a receipt image first.");
      return;
    }

    setIsProcessing(true);

    try {
      const result = await Tesseract.recognize(selectedFile, "eng");
      const extractedText = result.data.text;

      console.log("Extracted Text:", extractedText);

      // Improved regex to match total after tax, ignoring 'subtotal'
      const totalMatch = extractedText.match(
        /(total\s*(after\s*tax)?|grand\s*total|amount\s*due|final\s*total)[^\d]*(\d+[\.,]?\d*)/i
      );
      if (totalMatch) {
        setTotalCost(totalMatch[3]); // Extract and set the total cost
      } else {
        alert("Could not detect the total amount on the receipt.");
      }
    } catch (error) {
      console.error("OCR Error:", error);
      alert("An error occurred while scanning the receipt.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Upload Your Receipt</h2>
      <p className="mb-6 text-gray-600 text-center">
        Upload your receipt to scan and save the total amount automatically.
      </p>

      <div className="flex flex-col items-center gap-4">
        {/* File Upload */}
        <label className="block w-full max-w-sm">
          <span className="text-gray-700">Select a receipt image:</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-bg-green-900 hover:file:bg-green-900"
          />
        </label>

        {/* Scan Button */}
        <button
          onClick={handleScanReceipt}
          className="px-4 py-2 bg-green-900 text-white rounded hover:bg-green-900 disabled:opacity-50"
          disabled={isProcessing || !selectedFile}
        >
          {isProcessing ? "Scanning..." : "Scan Receipt"}
        </button>

        {/* Display Scanned Total */}
        {totalCost && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 border border-green-200 rounded">
            <p>
              <strong>Total Detected:</strong> ${totalCost}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptPage;
