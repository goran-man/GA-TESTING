import React, { useState } from "react";

export default function PDFUploader() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResponse(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Uncomment below when your n8n webhook is live:
      /*
      const res = await fetch("https://your-n8n-host/webhook/pdf-split", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      */

      // Temporary dummy data while webhook is offline:
      const data = {
        planPdfUrl: "https://example.com/sample-plan.pdf",
        sectionPdfUrl: "https://example.com/sample-section.pdf"
      };

      setResponse(data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-[700px] bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          📐 Guaranteed Asphalt Roof Plan & Section Matcher
        </h2>

        <div className="mb-6">
          <p className="text-left font-semibold mb-2">📂 Selected PDF Files</p>
          <div className="bg-black border border-white p-4 rounded h-24 overflow-y-auto">
            {file ? file.name : "No file selected"}
          </div>
        </div>

        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={() => document.querySelector('input[type="file"]').click()}
            className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200"
          >
            📁 Select PDF Files
          </button>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={handleUpload}
            className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200"
            disabled={loading}
          >
            📂 Classify + Save to Folder
          </button>

          <button
            className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-200"
            disabled={!response}
          >
            🔍 Run Match & Highlight
          </button>
        </div>

        <div className="mb-6 h-32 overflow-y-auto bg-black border border-white p-4 rounded">
          {error && <p className="text-red-500">{error}</p>}
          {response && (
            <>
              <h3 className="text-lg font-semibold mb-2">Categorised Output:</h3>
              <ul className="list-disc ml-6">
                {response.planPdfUrl && (
                  <li>
                    <a href={response.planPdfUrl} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                      Download Plan PDF
                    </a>
                  </li>
                )}
                {response.sectionPdfUrl && (
                  <li>
                    <a href={response.sectionPdfUrl} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                      Download Section PDF
                    </a>
                  </li>
                )}
              </ul>
            </>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={() => window.close()}
            className="bg-red-600 hover:bg-red-500 px-6 py-2 rounded font-semibold"
          >
            ❌ Exit
          </button>
        </div>
      </div>
    </div>
  );
}