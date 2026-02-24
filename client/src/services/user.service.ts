import { api } from "../lib/api-client";
import type { UserWithXP } from "../context/AuthContext";

export interface UserActivityResponse {
  success: boolean;
  data: number[];
}

export interface UpdateResponse {
  success: boolean;
  error?: string;
}

export const userService = {
  getRecentActivity: (userId: string) =>
    api.get<UserActivityResponse>(`/users/${userId}/activity`),

  getProfile: (userId: string) =>
    api.get<{ success: boolean; data: UserWithXP }>(`/users/${userId}`),

  checkHearts: () =>
    api.get<{
      success: boolean;
      data: { hearts: number; lastHeartLoss: string | null };
    }>("/users/hearts-check"),

  updateEmail: (userId: string, newEmail: string) =>
    api.patch<UpdateResponse>("/users/update-email", { userId, newEmail }),

  updatePassword: (userId: string, newPassword: string) =>
    api.patch<UpdateResponse>("/users/update-password", {
      userId,
      newPassword,
    }),

  deleteAccount: (userId: string) =>
    api.delete<UpdateResponse>(`/users/${userId}`),

  buyHeart: () =>
    api.post<{ success: boolean; message: string }>("/shop/buy-heart"),
};
