import { useState, useEffect, useCallback, useRef } from "react";

import { toast } from "sonner";
import { challengeService } from "../services/challenge.service";
import { userService } from "../services/user.service";
import type { Challenge } from "../services/challenge.service";
import { useAuth } from "../context/AuthContext";

export function useQuiz(challengeId: string | undefined) {
  const { refetchSession } = useAuth();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [nextRegenerationTime, setNextRegenerationTime] = useState<Date | null>(
    null,
  );

  const hasStarted = useRef(false);

  useEffect(() => {
    if (!challengeId || hasStarted.current) return;

    hasStarted.current = true;

    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const data = await challengeService.start(challengeId);

        if (data.success) {
          setChallenge(data.data);
          refetchSession();
          toast.info("Combat commencé ! -1 Coeur ❤️");
        }
      } catch (err: unknown) {
        console.error(err);
        hasStarted.current = false;
        const errorMessage = err instanceof Error ? err.message : String(err);

        if (errorMessage.includes("No hearts")) {
          setError(
            "Vous n'avez plus de coeurs ! Attendez qu'ils se régénèrent.",
          );
          const heartRes = await userService.checkHearts();
          if (heartRes.success && heartRes.data.lastHeartLoss) {
            const lastLossDate = new Date(heartRes.data.lastHeartLoss);
            const nextRegen = new Date(
              lastLossDate.getTime() + 8 * 60 * 60 * 1000,
            );
            setNextRegenerationTime(nextRegen);
          }
        } else {
          setError("Impossible de lancer le défi (Manque de coeurs ?)");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [challengeId, refetchSession]);

  const challengeQuestions = challenge?.questions || [];
  const currentQuestion = challengeQuestions[currentQuestionIndex];
  const totalQuestions = challengeQuestions.length;

  const handleCheckAnswer = useCallback(() => {
    if (!currentQuestion) return;

    setIsAnswerChecked(true);
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
  }, [currentQuestion, selectedOption]);

  useEffect(() => {
    if (showResult && challenge) {
      if (score === totalQuestions) {
        challengeService
          .complete(challenge.id)
          .then(() => {
            toast.success(
              "Victoire ! Votre coeur à été remboursé ! Vous avez également gagné de l'XP et des coins !",
            );
            refetchSession();
          })
          .catch(() => toast.error("Erreur lors de la validation du défi"));
      } else {
        toast.error("Dommage... Votre coeur est perdu !");
      }
    }
  }, [showResult, challenge, score, totalQuestions, refetchSession]);

  useEffect(() => {
    if (isAnswerChecked || !currentQuestion) return;

    if (timeLeft === 0) {
      const timeoutId = setTimeout(() => {
        handleCheckAnswer();
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswerChecked, currentQuestion, handleCheckAnswer]);

  const handleOptionClick = (index: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setTimeLeft(10);

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleQuit = useCallback(async () => {}, []);

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setTimeLeft(10);
  };

  return {
    challenge,
    loading,
    error,
    nextRegenerationTime,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    showResult,
    selectedOption,
    isAnswerChecked,
    timeLeft,
    handleOptionClick,
    handleCheckAnswer,
    handleNextQuestion,
    handleQuit,
    restartQuiz,
  };
}
