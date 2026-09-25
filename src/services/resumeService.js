import api from "@/api/axios";

export async function parseResume(cv) {
  const form = new FormData();
  form.append("cv", cv);
  const response = await api.post("resume/parse/", form);
  return response.data;
}
