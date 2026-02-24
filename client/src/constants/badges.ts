export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const BADGES: Record<string, Badge> = {
  "lvl-10": {
    id: "lvl-10",
    name: "Niveau 10",
    description: "Atteindre le niveau 10",
    image: "/lvl-10-no-bg.png",
  },
  fondateur: {
    id: "fondateur",
    name: "Fondateur",
    description: "Membre de la première heure de KROMA",
    image: "/fondateur-no-bg.png",
  },
};
