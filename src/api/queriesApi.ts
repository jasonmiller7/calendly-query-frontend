// src/api/queriesApi.ts
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export async function createQuery(data: Record<string, unknown>) {
  return (await API.post("/queries/create", data)).data;
}
