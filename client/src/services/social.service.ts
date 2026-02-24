import { api } from "../lib/api-client";

export interface FeedActor {
  id: string;
  name: string;
  image: string | null;
}

export interface FeedChallenge {
  id: string;
  title: string;
  difficulty: string;
  xp: number;
}

export interface FeedActivity {
  user: FeedActor;
  challenge: FeedChallenge;
  completedAt: string;
}

export interface FeedResponse {
  success: boolean;
  data: FeedActivity[];
}

export interface FollowingResponse {
  success: boolean;
  data: { id: string }[];
}

export const socialService = {
  getFeed: () => api.get<FeedResponse>("/social/feed"),

  getFollowing: (userId: string) =>
    api.get<FollowingResponse>(`/social/following/${userId}`),

  follow: (followingId: string) =>
    api.post<{ success: boolean }>("/social/follow", { followingId }),

  unfollow: (targetId: string) =>
    api.delete<{ success: boolean }>(`/social/unfollow/${targetId}`),
};
