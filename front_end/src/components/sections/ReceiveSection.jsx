import React, { useState } from "react";
import { Link, X } from "lucide-react";
import axios from "axios";

const ReceiveSection = ({ onClose }) => {
  const [transferId, setTransferId] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    if (!transferId.trim()) {
      setError("Please enter a valid transfer ID.");
      return;
    }

    setDownloading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/download",
        { transferId },
        { 
          responseType: "blob",
          headers: {
            Accept: "application/pdf"
          }
        }
      );

      // Check if the response is actually a PDF
      if (response.data.type !== "application/pdf") {
        throw new Error("Downloaded file is not a PDF");
      }

      // Create a downloadable link with .pdf extension
      const url = window.URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${transferId.trim()}.pdf`);
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setTransferId("");
    } catch (error) {
      console.error("Download failed:", error);
      setError(
        error.response?.status === 404
          ? "Transfer ID not found."
          : "Failed to download file. Please try again."
      );
    } finally {
      setDownloading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDownload();
    }
  };

  return (
    <div className="bg-blue-900/30 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-blue-500/50 w-full max-w-2xl mt-12 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Download Files</h2>
        <button
          onClick={onClose}
          className="text-blue-200 hover:text-white transition-colors"
          aria-label="Close receive section"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="bg-blue-950/50 border border-blue-800/50 rounded-lg p-6 mb-6">
        <div className="flex flex-col items-center justify-center text-center">
          <Link className="h-12 w-12 text-blue-400 mb-4" />
          <p className="text-blue-100 mb-4">
            Enter the shared transfer ID to receive your PDF files
          </p>
          <div className="w-full max-w-md">
            <input
              type="text"
              value={transferId}
              onChange={(e) => setTransferId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Transfer ID"
              className="w-full bg-blue-900/50 border border-blue-700 text-white px-4 py-2 rounded-lg mb-4 placeholder-blue-300 focus:outline-none focus:border-blue-500 transition-colors"
              disabled={downloading}
            />
            {error && (
              <div className="text-red-400 text-sm mb-4 bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={downloading || !transferId.trim()}
            >
              {downloading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Downloading...
                </span>
              ) : (
                "Download PDF"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiveSection;