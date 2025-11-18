// src/api/adminApi.ts
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export async function getPendingQueries(token: string) {
  return (await API.get("/queries/pending", { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function scheduleQuery(id: string, data: Record<string, unknown>, token: string) {
  return (await API.post(`/queries/schedule/${id}`, data, { headers: { Authorization: `Bearer ${token}` } })).data;
}

export async function rejectQuery(id: string, token: string) {
  return (await API.post(`/queries/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } })).data;
}
