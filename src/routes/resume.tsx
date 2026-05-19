import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { analyzeResume } from "@/services/resume";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/resume")({
  component: ResumeUpload,
});

function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    try {
      const res = await analyzeResume(file);
      setResult(res);
    } catch (err) {
      console.error(err);
      setResult("Error analyzing resume");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">

      <h1 className="text-xl font-bold flex items-center gap-2">
        <Upload className="size-5" />
        Resume Analyzer
      </h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full text-sm border p-2 rounded"
      />

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {result && (
        <div className="mt-4 p-4 rounded-xl glass whitespace-pre-wrap text-sm">
          {result}
        </div>
      )}
    </div>
  );
}