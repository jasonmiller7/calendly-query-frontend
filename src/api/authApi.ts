// src/api/authApi.ts
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export async function getProfile(token: string) {
  return (await API.get("/auth/profile", { headers: { Authorization: `Bearer ${token}` } })).data;
}
export async function register(data: Record<string, unknown>) {
  return (await API.post("/auth/register", data)).data;
}
export async function login(data: Record<string, unknown>) {
  return (await API.post("/auth/login", data)).data;
}
