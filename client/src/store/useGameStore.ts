// import { create } from "zustand";

// interface GameState {
//   userXp: number;
//   unlockedSkills: string[];
//   gainXp: (xp: number) => void;
//   unlockSkill: (skill: string) => void;
// }

// const useGameStore = create<GameState>((set) => ({
//   userXp: 0,
//   gainXp: (xp: number) => set((state) => ({ userXp: state.userXp + xp })),
//   unlockedSkills: ["html"],
//   unlockSkill: (skill: string) =>
//     set((state) => ({ unlockedSkills: [...state.unlockedSkills, skill] })),
// }));

// export default useGameStore;
