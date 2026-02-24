import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";
import { Code, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { challengeService } from "../services/challenge.service";
import type { Challenge } from "../services/challenge.service";

const DifficultyBadge = ({ level }: { level: "EASY" | "MEDIUM" | "HARD" }) => {
  const colors = {
    EASY: "bg-green-500/10 text-green-500 border-green-500/20",
    MEDIUM: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    HARD: "bg-red-500/10 text-red-500 border-red-500/20",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium border ${colors[level]}`}
    >
      {level.charAt(0) + level.slice(1).toLowerCase()}
    </span>
  );
};

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"ALL" | "NOT_COMPLETED">("ALL");

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await challengeService.getAll();
        if (data.success) {
          setChallenges(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter((c) => {
    if (filter === "NOT_COMPLETED") return !c.completed;
    return true;
  });

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-3">
              <Code className="text-indigo-500" size={40} /> Quiz
            </h1>
            <p className="text-slate-400">
              Pratiquez votre culture générale avec des quizz sur des
              thématiques variées.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === "ALL" ? "primary" : "outline"}
              className="text-sm"
              onClick={() => setFilter("ALL")}
            >
              Tous
            </Button>
            <Button
              variant={filter === "NOT_COMPLETED" ? "primary" : "outline"}
              className="text-sm"
              onClick={() => setFilter("NOT_COMPLETED")}
            >
              Non complétés
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredChallenges.map((challenge, idx) => (
              <Link
                to={`/challenges/${challenge.id}`}
                key={challenge.id}
                className="relative group bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 p-6 rounded-2xl transition-all duration-300 flex flex-col md:flex-row md:items-center gap-6"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    challenge.completed
                      ? "bg-green-500/20 text-green-500"
                      : "bg-slate-800 text-slate-500"
                  }`}
                >
                  {challenge.completed ? (
                    <CheckCircle2 size={24} />
                  ) : (
                    <div className="text-xl font-bold">#{idx + 1}</div>
                  )}
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {challenge.title}
                    </h3>
                    <DifficultyBadge level={challenge.difficulty} />
                  </div>
                  <p className="text-slate-400 mb-4 md:mb-0">
                    {challenge.description}
                  </p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1 flex-shrink-0 min-w-[140px]">
                  <div className="flex items-center gap-1.5 text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-2 md:mb-0">
                    <Zap size={16} /> +{challenge.xp} XP
                  </div>
                  <div className="flex gap-2">
                    {challenge.tags.map((tag) => (
                      <span key={tag} className="text-xs text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
