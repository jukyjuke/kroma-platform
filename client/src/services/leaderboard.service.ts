import { api } from "../lib/api-client";

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  xp: number;
  image: string | null;
}

export interface LeaderboardResponse {
  success: boolean;
  data: LeaderboardUser[];
}

export const leaderboardService = {
  getGlobal: () => api.get<LeaderboardResponse>("/leaderboard"),
};
