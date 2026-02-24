const baseUrl = import.meta.env.VITE_API_URL + "/api";

export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  xp: number;
  tags: string[];
  completed?: boolean;
  questions?: Question[];
  data: Challenge[];
};

export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: number;
};

export async function getChallenges(): Promise<Challenge[]> {
  const response = await fetch(`${baseUrl}/challenges`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch challenges");
  }
  const data = await response.json();
  return data.data;
}

export async function getChallengeById(id: string): Promise<Challenge> {
  const response = await fetch(`${baseUrl}/challenges/${id}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch challenge");
  }
  const data = await response.json();
  return data.data;
}

export async function completeChallenge(id: string): Promise<void> {
  const response = await fetch(`${baseUrl}/challenges/${id}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to complete challenge");
  }

  const data = await response.json();
  if (!data.success) {
    // Should not happen with current controller logic but good safety
    throw new Error(data.message || "Failed to complete challenge");
  }
}
