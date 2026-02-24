import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ArrowLeft, Zap, Play, Loader2, Coins } from "lucide-react";
import { Button } from "../components/ui/Button";
import { challengeService } from "../services/challenge.service";
import type { Challenge } from "../services/challenge.service";

export default function ChallengeDetails() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let ignore = false;
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const data = await challengeService.getById(id);
        if (!ignore && data.success) {
          setChallenge(data.data);
          setLoading(false);
        }
      } catch (err) {
        if (!ignore) {
          console.error(err);
          setError(
            err instanceof Error
              ? err.message
              : "Erreur lors du chargement du défi",
          );
          setLoading(false);
        }
      }
    };

    fetchChallenge();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="pt-20 text-center text-white">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-4" />
          Chargement...
        </div>
      </Layout>
    );
  }

  if (!challenge) {
    return (
      <Layout>
        <div className="pt-20 text-center mb-20">
          <h1 className="text-2xl text-white pb-10">
            {error || "Challenge non trouvé"}
          </h1>
          <Link to="/challenges" className="text-indigo-400 hover:underline">
            Retour aux challenges
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <Link
          to="/challenges"
          className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Retour
        </Link>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">
                {challenge.title}
              </h1>
              <div className="flex gap-2">
                {challenge.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold bg-yellow-500/10 px-4 py-2 rounded-full border border-yellow-500/20">
                <Coins size={20} /> +{challenge.coins || 20}
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400 font-bold bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                <Zap size={20} /> +{challenge.xp} XP
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-lg mb-8 leading-relaxed">
            {challenge.description}
          </p>

          <div className="bg-slate-800/50 rounded-xl p-6 mb-8 border border-slate-700/50">
            <h3 className="text-white font-bold mb-4">Instructions</h3>
            <ul className="list-disc list-inside text-slate-300 space-y-2">
              <li>Lisez attentivement l'énoncé.</li>
              <li>Répondez aux questions dans le temps imparti.</li>
              <li>Validez pour obtenir vos points d'expérience.</li>
            </ul>
          </div>

          <div className="flex justify-end">
            <Link to={`/challenges/${id}/play`}>
              <Button className="flex items-center gap-2 px-8 py-6 h-auto text-lg shadow-lg shadow-indigo-500/20">
                <Play size={20} /> Commencer le défi
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
