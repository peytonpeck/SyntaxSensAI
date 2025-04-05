import type { User } from "./model/User";

const baseURL = "http://localhost:7012";

async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${baseURL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.details || data.message || "Unknown error");
  }

  return data;
}

const Authentication = {
  login: async (body: { email: string; password: string }): Promise<User> => {
    return await apiFetch<User>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

const User = {
  account: async (token: string): Promise<User> => {
    return await apiFetch<User>("/api/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export const Api = {
  Authentication,
  User,
};
