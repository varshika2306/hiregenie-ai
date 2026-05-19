import API from "./api";

export async function chatWithMentor(message: string) {
  const response = await API.post("/career-agent", {
    message,
  });

  return response.data.roadmap || response.data.response;
}