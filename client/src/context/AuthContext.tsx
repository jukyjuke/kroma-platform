/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { authClient } from "../lib/auth-client";

type SessionPayload = typeof authClient.$Infer.Session;

export type UserWithXP = SessionPayload["user"] & {
  xp?: number;
  completedChallengesCount?: number;
  badges?: string[];
  streak?: number;
  lastActive?: Date;
  maxStreak?: number;
  hearts?: number;
  role?: "USER" | "ADMIN";
  coins?: number;
};

export type AuthContextType = {
  session: SessionPayload["session"] | null;
  user: UserWithXP | null;
  loading: boolean;
  signIn: typeof authClient.signIn;
  signOut: typeof authClient.signOut;
  signUp: typeof authClient.signUp;
  refetchSession: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, refetch } = authClient.useSession();

  const value = {
    session: data?.session || null,
    user: (data?.user as UserWithXP) || null,
    loading: isPending,
    signIn: authClient.signIn,
    signOut: authClient.signOut,
    signUp: authClient.signUp,
    refetchSession: refetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
