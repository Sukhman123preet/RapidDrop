import React, { useState, useEffect } from "react";
import { Upload, File, X, Copy, Check, AlertCircle } from "lucide-react";

const CustomAlert = ({ children, variant = "default" }) => {
  const baseClasses = "flex items-center gap-2 p-4 rounded-lg text-sm";
  const variantClasses = {
    default: "bg-blue-950/50 border border-blue-700/50 text-blue-200",
    destructive: "bg-red-950/50 border border-red-700/50 text-red-200"
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </div>
  );
};

const TransferSection = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [customLink, setCustomLink] = useState(null);
  const [smashUploader, setSmashUploader] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (window.SmashUploader) {
      try {
        const su = new window.SmashUploader({
          region: "eu-central-1",
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVjZTExODk3LWU0YTYtNDljZS1iYTE1LWIzZjFiZjliNDE2NS1kdSIsInVzZXJuYW1lIjoiNjVhZjVkOGEtYzZlNS00NzI3LWFiZTgtZjI0MzgzOWE1ODA4IiwicmVnaW9uIjoiZXUtY2VudHJhbC0xIiwiaXAiOiIxMDMuNDEuMzYuMjA2Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6IjFmODIyOWVhLTcxYzktNGIzNS1hMTMzLWYzNjE3MjM1ZWZlYS1kYSIsImlhdCI6MTc0MDE0NjUwMiwiZXhwIjo0ODk1OTA2NTAyfQ.Iq1gPaHO2C4e26S74xtUC38Ngso_YR7aBOytY14cG5E",
        });
        setSmashUploader(su);
        setError(null);
      } catch (err) {
        setError("Failed to initialize upload service");
      }
    } else {
      setError("Upload service not available");
    }
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const validateFile = (file) => {
    if (!file) return false;
    if (file.type !== 'application/pdf') {
      setError("Please select a PDF file");
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setCustomLink(null);
      }, 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  const generateLink = async () => {
    if (!selectedFile) {
      setError("Please select a PDF file.");
      return;
    }

    if (!smashUploader) {
      setError("Upload service not initialized");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const transfer = await smashUploader.upload({
        files: [selectedFile],
        availabilityDuration: 604800, // 7 days
      });

      if (transfer?.transfer?.id) {
        const link = `https://RapidDrop.com/${transfer.transfer.id}`;
        setCustomLink(link);
      } else {
        throw new Error("Invalid upload response");
      }
    } catch (error) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-blue-950/30 backdrop-blur-md p-8 rounded-xl shadow-xl border border-blue-700/50 w-full max-w-xl mt-12 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Upload PDF</h2>
        <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
          <X className="h-6 w-6" />
        </button>
      </div>

      {error && (
        <CustomAlert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </CustomAlert>
      )}

      <div
        className={`relative bg-blue-950/50 border-2 border-dashed ${
          dragActive ? 'border-blue-400' : 'border-blue-800/50'
        } rounded-lg p-8 mb-6 transition-colors`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-16 w-16 text-blue-400 mb-4" />
          {selectedFile ? (
            <div className="bg-blue-900/50 p-4 rounded-lg w-full">
              <div className="flex items-center gap-3">
                <File className="text-blue-400 h-5 w-5" />
                <span className="text-blue-200 text-sm truncate">{selectedFile.name}</span>
                <span className="text-blue-400 text-sm">
                  ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-blue-100 text-lg mb-2">Drag and drop your PDF here</p>
              <p className="text-blue-300 text-sm mb-4">or</p>
              <label
                htmlFor="fileInput"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg cursor-pointer transition-colors"
              >
                Browse Files
              </label>
              <p className="text-blue-400 text-sm mt-4">Maximum file size: 5GB</p>
            </>
          )}
        </div>
      </div>

      {selectedFile && (
        <div className="space-y-4">
          <button
            onClick={generateLink}
            disabled={isUploading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white font-medium px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                Uploading...
              </>
            ) : (
              'Generate Share Link'
            )}
          </button>

          {customLink && (
            <div className="p-4 bg-green-800/30 border border-green-500 rounded-lg">
              <p className="text-green-200 text-sm mb-2">Share Link:</p>
              <div className="flex items-center justify-between gap-3 bg-green-900/50 p-2 rounded">
                <span className="text-green-400 text-sm break-all">{customLink}</span>
                <button
                  onClick={() => copyToClipboard(customLink)}
                  className="text-green-400 hover:text-green-300 p-1"
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransferSection;
