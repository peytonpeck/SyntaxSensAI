import { LOCAL_STORAGE_TOKEN_KEY } from "./lib/constants";
import { isJwtExpired } from "./lib/utils";
import { queryClient } from "./main";
import type { LessonPlan } from "./model/LessonPlan";
import type { User } from "./model/User";
import { accountQueryOptionsKey } from "./queryOptions/accountQueryOptions";

const baseURL = "http://localhost:7012";

async function apiFetch<T>(input: string, init?: RequestInit): Promise<T> {
  const authToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (authToken) {
    if (isJwtExpired(authToken)) {
      queryClient.setQueryData([accountQueryOptionsKey], undefined);
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      throw new Error("Session expired.");
    }
    headers.Authorization = `Bearer ${authToken}`;
  }

  const response = await fetch(`${baseURL}${input}`, {
    ...init,
    headers: {
      ...headers,
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
  login: async (body: { email: string; password: string }) =>
    await apiFetch<User>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

const User = {
  account: async () =>
    await apiFetch<User>("/api/user", {
      method: "GET",
    }),
};

const LessonPlan = {
  getLessonPlans: async (lessonPlanId?: string) =>
    await apiFetch<LessonPlan[]>(
      `/api/lesson-plan${lessonPlanId ? `?lessonPlanId=${lessonPlanId}` : ""}`,
      {
        method: "GET",
      }
    ),
  createLessonPlan: async (body: { essayContent: string }) =>
    await apiFetch<LessonPlan>("/api/lesson-plan", {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export const Api = {
  Authentication,
  User,
  LessonPlan,
};
