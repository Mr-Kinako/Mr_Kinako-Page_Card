// src/pages/DiscordServers/Kinland/api/client.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    let errorMessage = `API ${path}: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      if (errorBody && typeof errorBody.error === "string") {
        errorMessage = errorBody.error;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json() as Promise<T>;
}
