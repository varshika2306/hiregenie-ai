import API from "./api";

export async function analyzeResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await API.post("/analyze-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.analysis;
}