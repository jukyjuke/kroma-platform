// ============================================
// TESTS DE LA BOUTIQUE - Validation des Achats
// ============================================
// Ce fichier teste la page Shop pour vérifier :
// 1. Qu'un utilisateur PEUT acheter s'il a assez de pièces
// 2. Qu'un utilisateur NE PEUT PAS acheter s'il n'a pas assez de pièces

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Shop from "../pages/Shop";
import { BrowserRouter } from "react-router-dom";
import { userService } from "../services/user.service";

// On importe le contexte d'authentification pour le mocker
import * as AuthContext from "../context/AuthContext";

// ============================================
// MOCKS
// ============================================

// Mock du service utilisateur (appels API)
vi.mock("../services/user.service", () => ({
  userService: {
    buyHeart: vi.fn(), // On remplace la vraie fonction par un espion
  },
}));

// Mock des notifications toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// ============================================
// GROUPE DE TESTS : Système de Boutique
// ============================================
describe("Shop System", () => {
  // Réinitialiser tous les mocks avant chaque test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ============================================
  // TEST 1 : Achat RÉUSSI (assez de pièces)
  // ============================================
  it("should allow buying a heart if user has enough coins", async () => {
    // --- ARRANGE ---
    // On crée un faux utilisateur RICHE (100 pièces, il en faut 50)
    const mockUser = {
      id: "u1",
      name: "Rich User",
      email: "rich@test.com",
      coins: 100, // ✅ Suffisant (prix = 50)
      hearts: 3, // Pas au maximum
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: true,
    };

    // On "espionne" le hook useAuth pour qu'il retourne notre faux utilisateur
    // vi.spyOn = "surveille cette fonction et remplace son retour"
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      signIn: vi.fn() as any,
      signOut: vi.fn() as any,
      signUp: vi.fn() as any,
      refetchSession: vi.fn(),
    });

    // On configure le mock de l'API pour simuler un achat réussi
    (userService.buyHeart as any).mockResolvedValue({
      success: true,
      message: "Achat réussi",
    });
    // mockResolvedValue = "quand cette fonction est appelée, retourne cette Promise résolue"

    // On rend la page Shop
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>,
    );

    // --- ACT ---
    // On clique sur le bouton "Acheter"
    const buyButton = screen.getByText("Acheter");
    fireEvent.click(buyButton);

    // --- ASSERT ---
    // On vérifie que le service d'achat a bien été appelé
    await waitFor(() => {
      expect(userService.buyHeart).toHaveBeenCalled();
    });

    // On vérifie que le toast de succès s'est affiché
    const { toast } = await import("sonner");
    expect(toast.success).toHaveBeenCalledWith("Achat réussi");
  });

  // ============================================
  // TEST 2 : Achat BLOQUÉ (pas assez de pièces)
  // ============================================
  it("should disable buy button if user has insufficient coins", () => {
    // --- ARRANGE ---
    // On crée un faux utilisateur PAUVRE (10 pièces, il en faut 50)
    const mockUser = {
      id: "u2",
      name: "Poor User",
      email: "poor@test.com",
      coins: 10, // ❌ Insuffisant (prix = 50)
      hearts: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: true,
    };

    // On configure useAuth pour retourner ce pauvre utilisateur
    vi.spyOn(AuthContext, "useAuth").mockReturnValue({
      user: mockUser,
      session: null,
      loading: false,
      signIn: vi.fn() as any,
      signOut: vi.fn() as any,
      signUp: vi.fn() as any,
      refetchSession: vi.fn(),
    });

    // On rend la page Shop
    render(
      <BrowserRouter>
        <Shop />
      </BrowserRouter>,
    );

    // --- ASSERT ---
    // On vérifie que le bouton "Acheter" est désactivé
    const buyButton = screen.getByText("Acheter");
    expect(buyButton).toBeDisabled();
    // .toBeDisabled() = vérifie que l'élément a l'attribut "disabled"
    // C'est une assertion de @testing-library/jest-dom
  });
});
