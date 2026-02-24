import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  user: {
    additionalFields: {
      xp: {
        type: "number",
      },
      completedChallengesCount: {
        type: "number",
      },
      badges: {
        type: "string[]",
      },
      streak: {
        type: "number",
      },
      lastActive: {
        type: "date",
      },
      maxStreak: {
        type: "number",
      },
      hearts: {
        type: "number",
      },
      lastHeartLoss: {
        type: "date",
      },
      role: {
        type: "string",
      },
      coins: {
        type: "number",
      },
    },
  },
});
