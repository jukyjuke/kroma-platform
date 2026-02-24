import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { useQuiz } from "../hooks/useQuiz";
import { QuizInterface } from "../components/challenges/QuizInterface";
import { QuizResult } from "../components/challenges/QuizResult";

export default function ChallengePlay() {
  const { id } = useParams();
  const {
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
  } = useQuiz(id);

  if (loading) {
    return (
      <Layout>
        <div className="pt-20 text-center text-white">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          Chargement...
        </div>
      </Layout>
    );
  }

  if (error || !challenge || !currentQuestion) {
    return (
      <Layout>
        <div className="pt-20 text-center mb-20">
          <h1 className="text-2xl text-white pb-10">
            {error || "Challenge ou questions non trouvés"}
          </h1>
          {nextRegenerationTime && (
            <div className="mb-8">
              <Countdown targetDate={nextRegenerationTime} />
            </div>
          )}
          <Link to="/challenges" className="text-indigo-400 hover:underline">
            Retour aux challenges
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {showResult ? (
        <QuizResult
          score={score}
          totalQuestions={totalQuestions}
          restartQuiz={restartQuiz}
        />
      ) : (
        <QuizInterface
          challengeId={id}
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          timeLeft={timeLeft}
          selectedOption={selectedOption}
          isAnswerChecked={isAnswerChecked}
          handleOptionClick={handleOptionClick}
          handleCheckAnswer={handleCheckAnswer}
          handleNextQuestion={handleNextQuestion}
          handleQuit={handleQuit}
        />
      )}
    </Layout>
  );
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference > 0) {
      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return null;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft)
    return (
      <div className="text-green-400">
        Régénération terminée ! Rechargez la page.
      </div>
    );

  return (
    <div className="text-4xl font-mono text-yellow-400">
      {String(timeLeft.hours).padStart(2, "0")}:
      {String(timeLeft.minutes).padStart(2, "0")}:
      {String(timeLeft.seconds).padStart(2, "0")}
    </div>
  );
}
