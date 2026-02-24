import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  restartQuiz: () => void;
}

export function QuizResult({
  score,
  totalQuestions,
  restartQuiz,
}: QuizResultProps) {
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-white mb-6">
          Résultats du Défi
        </h1>
        <div className="text-6xl font-bold text-indigo-500 mb-4">
          {score} / {totalQuestions}
        </div>
        <p className="text-xl text-slate-300 mb-8">
          {percentage === 100
            ? "Tout simplement parfait !"
            : percentage >= 80
              ? "Bien, vous maîtrisez le sujet... Mais pas assez !"
              : percentage >= 50
                ? "C'est plutôt médiocre ! Encore quelques efforts pour parvenir à la décence."
                : "Continuez à vous exercer, vous pourriez éventuellement réussir..."}
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={restartQuiz}>
            Rejouer
          </Button>
          <Link to="/challenges">
            <Button>Liste des défis</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
