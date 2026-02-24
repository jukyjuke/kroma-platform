// ============================================
// TESTS DU JEU - Vérification du Feedback Visuel
// ============================================
// Ce fichier teste le composant QuizInterface pour s'assurer
// que l'utilisateur voit le bon feedback (vert/rouge) selon sa réponse.

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// Note: fireEvent n'est pas utilisé ici car on teste uniquement le RENDU,
// pas les interactions (le composant reçoit déjà les props "isAnswerChecked")

import { QuizInterface } from "../components/challenges/QuizInterface";
import { BrowserRouter } from "react-router-dom";

// ============================================
// DONNÉES DE TEST (FIXTURES)
// ============================================
// On crée une fausse question pour nos tests
// C'est plus propre que de la définir dans chaque test
const mockQuestion = {
  id: "q1",
  question: "Quelle est la capitale de la France ?",
  options: ["Londres", "Paris", "Berlin", "Madrid"],
  answer: 1, // Index 1 = "Paris" est la bonne réponse
  explanation: "C'est Paris.",
};

// ============================================
// GROUPE DE TESTS : Mécanique de Jeu
// ============================================
describe("Game Mechanics - QuizInterface", () => {
  // ============================================
  // TEST 1 : Feedback VERT quand on répond BIEN
  // ============================================
  it("should show green feedback when answering correctly", () => {
    // Fonction mock vide car on ne teste pas le clic ici
    const handleOptionClickMock = vi.fn();

    // --- ARRANGE ---
    // On rend le composant AVEC les props simulant :
    // - L'utilisateur a sélectionné l'index 1 (Paris)
    // - La réponse a été vérifiée (isAnswerChecked = true)
    render(
      <BrowserRouter>
        <QuizInterface
          challengeId="1"
          currentQuestion={mockQuestion}
          currentQuestionIndex={0}
          totalQuestions={10}
          timeLeft={10}
          selectedOption={1} // L'utilisateur a cliqué sur "Paris" (index 1)
          isAnswerChecked={true} // La réponse est révélée
          handleOptionClick={handleOptionClickMock}
          handleCheckAnswer={() => {}}
          handleNextQuestion={() => {}}
          handleQuit={() => {}}
        />
      </BrowserRouter>,
    );

    // --- ASSERT ---
    // On cherche le bouton qui contient "Paris"
    const correctButton = screen.getByText("Paris").closest("button");
    // .closest("button") = remonte dans le DOM pour trouver le <button> parent

    // On vérifie que le bouton a les classes CSS de "bonne réponse"
    expect(correctButton?.className).toContain("bg-green-500/10");
    // La classe "bg-green-500/10" = fond vert semi-transparent (Tailwind)

    expect(correctButton?.className).toContain("text-green-400");
    // La classe "text-green-400" = texte vert
  });

  // ============================================
  // TEST 2 : Feedback ROUGE quand on répond MAL
  // ============================================
  it("should show red feedback when answering incorrectly", () => {
    // --- ARRANGE ---
    // Cette fois, l'utilisateur a sélectionné l'index 0 (Londres)
    // Mais la bonne réponse est toujours l'index 1 (Paris)
    render(
      <BrowserRouter>
        <QuizInterface
          challengeId="1"
          currentQuestion={mockQuestion}
          currentQuestionIndex={0}
          totalQuestions={10}
          timeLeft={10}
          selectedOption={0} // ERREUR : L'utilisateur a cliqué sur "Londres"
          isAnswerChecked={true}
          handleOptionClick={() => {}}
          handleCheckAnswer={() => {}}
          handleNextQuestion={() => {}}
          handleQuit={() => {}}
        />
      </BrowserRouter>,
    );

    // --- ASSERT ---
    // Le bouton "Londres" (mauvaise réponse sélectionnée) doit être ROUGE
    const wrongButton = screen.getByText("Londres").closest("button");
    expect(wrongButton?.className).toContain("bg-red-500/10");
    expect(wrongButton?.className).toContain("text-red-400");

    // Le bouton "Paris" (bonne réponse) doit quand même être VERT
    // pour montrer à l'utilisateur quelle était la bonne réponse
    const correctButton = screen.getByText("Paris").closest("button");
    expect(correctButton?.className).toContain("bg-green-500/10");
  });
});
