import { api } from "../lib/api-client";

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  xp: number;
  coins: number;
  tags: string[];
  completed?: boolean;
  questions?: Question[];
}

export interface ChallengesResponse {
  success: boolean;
  data: Challenge[];
}

export interface ChallengeResponse {
  success: boolean;
  data: Challenge;
}

export const challengeService = {
  getAll: () => api.get<ChallengesResponse>("/challenges"),

  getById: (id: string) => api.get<ChallengeResponse>(`/challenges/${id}`),

  complete: (id: string) =>
    api.post<{ success: boolean; message?: string }>(
      `/challenges/${id}/complete`,
    ),

  fail: (id: string) =>
    api.post<{ success: boolean; message?: string }>(`/challenges/${id}/fail`),

  create: (data: any) =>
    api.post<{ success: boolean; message: string; data: Challenge }>(
      "/challenges",
      data,
    ),

  start: (id: string) =>
    api.post<{ success: boolean; message: string; data: Challenge }>(
      `/challenges/${id}/start`,
    ),
};
