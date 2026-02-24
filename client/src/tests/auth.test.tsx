// ============================================
// 1. IMPORTS - On importe les outils de test
// ============================================
import { describe, it, expect, vi, beforeEach } from "vitest";
//         │        │    │       │      │
//         │        │    │       │      └── Fonction qui s'exécute AVANT chaque test
//         │        │    │       └── "vi" = la librairie de mocking de Vitest
//         │        │    └── Fonction pour vérifier qu'une condition est vraie
//         │        └── Déclare UN test individuel ("it should do X")
//         └── Regroupe plusieurs tests liés ensemble

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
//         │       │        │           │
//         │       │        │           └── Attend qu'une condition async soit vraie
//         │       │        └── Simule des actions utilisateur (clic, écriture)
//         │       └── Permet de "chercher" des éléments dans le DOM rendu
//         └── Rend un composant React dans un DOM virtuel

import Register from "../pages/Register"; // Le composant qu'on teste
import { BrowserRouter } from "react-router-dom"; // Nécessaire car Register utilise <Link>
import { authClient } from "../lib/auth-client"; // Ce qu'on va MOCKER

// ============================================
// 2. MOCKS - On remplace les vrais modules par des faux
// ============================================

// On dit à Vitest : "Quand quelqu'un importe '../components/Layout',
// donne-lui cette version simplifiée à la place"
vi.mock("../components/Layout", () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  //   Au lieu du vrai Layout (qui utilise useAuth et plante),
  //   on retourne juste une div qui affiche ses enfants
}));

// Pareil pour authClient - on remplace la VRAIE fonction d'inscription
// par une fonction "espion" qu'on contrôle
vi.mock("../lib/auth-client", () => ({
  authClient: {
    signUp: {
      email: vi.fn(), // vi.fn() = crée une fonction "espion" qu'on peut surveiller
    },
  },
}));

// Mock de useNavigate pour vérifier les redirections
const navigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal(); // Garde les vraies fonctions
  return {
    ...(actual as object),
    useNavigate: () => navigateMock, // sauf useNavigate qu'on remplace
  };
});

// Mock des toasts (notifications)
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// ============================================
// 3. STRUCTURE DES TESTS
// ============================================

describe("Authentication Flow - Register", () => {
  // describe = "Je décris un groupe de tests sur le sujet X"

  beforeEach(() => {
    vi.clearAllMocks(); // Réinitialise tous les mocks avant chaque test
  });

  // ============================================
  // 4. UN TEST INDIVIDUEL
  // ============================================
  it("should submit the form with valid data", async () => {
    // "it" = "il devrait..." - décrit le comportement attendu

    // --- ARRANGE (Préparer) ---
    // On rend le composant dans un DOM virtuel
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    // --- ACT (Agir) ---
    // On simule ce que ferait un utilisateur

    // 1. Trouver le champ "Nom complet" par son label et écrire dedans
    fireEvent.change(screen.getByLabelText(/Nom complet/i), {
      target: { value: "Test User" },
    });
    // screen.getByLabelText = cherche un input qui a un label contenant "Nom complet"
    // fireEvent.change = simule la frappe au clavier

    // 2. Remplir l'email
    fireEvent.change(screen.getByLabelText(/Adresse email/i), {
      target: { value: "test@example.com" },
    });

    // 3. Remplir le mot de passe
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "password123" },
    });

    // 4. Cocher la case des CGU
    fireEvent.click(screen.getByRole("checkbox", { name: /j'accepte/i }));
    // screen.getByRole = cherche par rôle HTML (checkbox, button, etc.)

    // 5. Cliquer sur le bouton "S'inscrire"
    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    // --- ASSERT (Vérifier) ---
    // On vérifie que le mock a été appelé correctement

    await waitFor(() => {
      // waitFor = attend que la condition soit vraie (utile pour l'async)
      expect(authClient.signUp.email).toHaveBeenCalledWith(
        // expect(X).toHaveBeenCalledWith(Y) = "X a-t-il été appelé avec Y ?"
        expect.objectContaining({
          email: "test@example.com",
          name: "Test User",
          password: "password123",
        }),
        expect.any(Object), // On accepte n'importe quel objet pour le 2ème argument
      );
    });

    // Simuler que l'API a répondu "succès"
    const callArgs = (authClient.signUp.email as any).mock.calls[0];
    // .mock.calls[0] = le premier appel à cette fonction
    const callbacks = callArgs[1]; // Le 2ème argument contient les callbacks
    callbacks.onSuccess(); // On déclenche manuellement le callback de succès

    // Vérifier que l'utilisateur est redirigé vers "/"
    expect(navigateMock).toHaveBeenCalledWith("/");
  });
});
