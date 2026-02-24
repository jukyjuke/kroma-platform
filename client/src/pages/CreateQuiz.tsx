import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { useState } from "react";
import { challengeService } from "../services/challenge.service";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";

interface QuestionFormData {
  question: string;
  options: string[];
  answer: number;
}

interface QuizFormData {
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  xp: number;
  tags: string;
  questions: QuestionFormData[];
}

export default function CreateQuiz() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuizFormData>({
    title: "",
    description: "",
    difficulty: "EASY",
    xp: 50,
    tags: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        answer: 0,
      },
    ],
  });

  if (loading) return <div>Loading...</div>;
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | number,
  ) => {
    const newQuestions = [...formData.questions];
    if (field === "question") {
      newQuestions[index].question = value as string;
    } else if (field === "answer") {
      newQuestions[index].answer = Number(value);
    }
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    value: string,
  ) => {
    const newQuestions = [...formData.questions];
    newQuestions[qIndex].options[oIndex] = value;
    setFormData((prev) => ({ ...prev, questions: newQuestions }));
  };

  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        { question: "", options: ["", "", "", ""], answer: 0 },
      ],
    }));
  };

  const removeQuestion = (index: number) => {
    if (formData.questions.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await challengeService.create(formData);
      if (res.success) {
        toast.success("Quiz créé avec succès !");
        navigate("/challenges");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du quiz");
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Créer un Quiz</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations générales -------------------------------------------------- */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-indigo-400">
              Informations Générales
            </h2>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Titre
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  Difficulté
                </label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="EASY">Facile</option>
                  <option value="MEDIUM">Moyen</option>
                  <option value="HARD">Difficile</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">
                  XP
                </label>
                <input
                  type="number"
                  name="xp"
                  value={formData.xp}
                  onChange={handleInputChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                placeholder="frontend, javascript, react..."
              />
            </div>
          </div>

          {/* Question -------------------------------------------------- */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-indigo-400 flex justify-between items-center">
              Questions ({formData.questions.length})
              <Button type="button" onClick={addQuestion} variant="secondary">
                <Plus size={16} className="mr-2" /> Ajouter une question
              </Button>
            </h2>

            {formData.questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 relative"
              >
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-500"
                >
                  <X size={20} />
                </button>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-400 mb-1">
                    Question {qIndex + 1}
                  </label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) =>
                      handleQuestionChange(qIndex, "question", e.target.value)
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                    placeholder="Quelle est la capitale de la France ?"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name={`answer-${qIndex}`}
                        checked={q.answer === oIndex}
                        onChange={() =>
                          handleQuestionChange(qIndex, "answer", oIndex)
                        }
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(qIndex, oIndex, e.target.value)
                        }
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                        placeholder={`Option ${oIndex + 1}`}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 pb-20">
            <Button
              type="submit"
              className="text-lg px-8 py-4 h-auto bg-green-600 hover:bg-green-700"
            >
              Publier le Quiz
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
