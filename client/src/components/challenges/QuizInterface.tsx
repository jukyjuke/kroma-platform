import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { type Question } from "../../services/challenge.service";

interface QuizInterfaceProps {
  challengeId: string | undefined;
  currentQuestion: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  timeLeft: number;
  selectedOption: number | null;
  isAnswerChecked: boolean;
  handleOptionClick: (index: number) => void;
  handleCheckAnswer: () => void;
  handleNextQuestion: () => void;
  handleQuit: () => void;
}

export function QuizInterface({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  challengeId: _id,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  timeLeft,
  selectedOption,
  isAnswerChecked,
  handleOptionClick,
  handleCheckAnswer,
  handleNextQuestion,
  handleQuit,
}: QuizInterfaceProps) {
  const navigate = useNavigate();

  return (
    <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center text-sm text-slate-400">
        <button
          onClick={() => {
            handleQuit();
            navigate("/challenges");
          }}
          className="flex items-center hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} className="mr-1" /> Quitter
        </button>

        <span>
          Question {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${timeLeft > 5 ? "bg-indigo-500" : "bg-red-500"}`}
            style={{ width: `${(timeLeft / 10) * 100}%` }}
          />
        </div>

        <div className="flex justify-between items-start mb-8">
          <h2 className="text-2xl font-bold text-white">
            {currentQuestion.question}
          </h2>
          <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center font-mono text-lg font-bold text-slate-300">
            {timeLeft}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {currentQuestion.options.map((option: string, index: number) => {
            let buttonStyle =
              "w-full text-left p-4 rounded-xl border transition-all duration-200 flex justify-between items-center ";
            if (isAnswerChecked) {
              if (index === currentQuestion.answer) {
                buttonStyle +=
                  "bg-green-500/10 border-green-500/50 text-green-400";
              } else if (index === selectedOption) {
                buttonStyle += "bg-red-500/10 border-red-500/50 text-red-400";
              } else {
                buttonStyle += "bg-slate-800 border-slate-700 text-slate-500";
              }
            } else {
              if (index === selectedOption) {
                buttonStyle +=
                  "bg-indigo-500/20 border-indigo-500 text-indigo-300";
              } else {
                buttonStyle +=
                  "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-600";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={buttonStyle}
                disabled={isAnswerChecked}
              >
                <span className="font-medium">{option}</span>
                {isAnswerChecked && index === currentQuestion.answer && (
                  <CheckCircle2 size={20} />
                )}
                {isAnswerChecked &&
                  index === selectedOption &&
                  index !== currentQuestion.answer && <XCircle size={20} />}
              </button>
            );
          })}
        </div>

        <div className="flex justify-end">
          {!isAnswerChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={
                selectedOption === null ? "opacity-50 cursor-not-allowed" : ""
              }
            >
              Valider
            </Button>
          ) : (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < totalQuestions - 1
                ? "Question suivante"
                : "Voir les résultats"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
