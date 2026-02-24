import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";
import { FeatureCard } from "../components/ui/FeatureCard";
import { Trophy, ArrowRight, Brain, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <Layout>
      <div className="pb-24 lg:pt-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
            Testez vos connaissances. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Devenez le Champion.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10">
            Rejoignez KROMA, une plateforme de quiz en ligne.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to="/challenges">
              <Button
                variant="primary"
                className="w-full sm:w-auto text-lg px-8"
              >
                Vers les Quiz
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/leaderboard">
              <Button
                variant="secondary"
                className="w-full sm:w-auto text-lg px-8"
              >
                Voir le Classement
              </Button>
            </Link>
          </div>

          {/* Exemple de Quiz -------------------------------------------------- */}
          <div className="relative max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
            <div className="relative bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-300">
                    Question 1/10
                  </span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Culture Générale
                  </span>
                </div>
                <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center font-mono text-lg font-bold text-slate-300">
                  7
                </div>
              </div>
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                  Quelle est la capitale de la France ?
                </h2>
                <div className="grid gap-3">
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 flex justify-between items-center opacity-75">
                    <span className="text-slate-300">Berlin</span>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-indigo-500 bg-indigo-500/10 flex justify-between items-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <span className="text-white font-semibold">Paris</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 flex justify-between items-center opacity-75">
                    <span className="text-slate-300">Londres</span>
                  </div>
                  <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50 flex justify-between items-center opacity-75">
                    <span className="text-slate-300">Madrid</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fonctionnalités -------------------------------------------------- */}
      <section id="features" className="pb-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Pourquoi KROMA ?
            </h2>

            {/* <p className="text-slate-300 max-w-2xl mx-auto">
              Plus que de simples quizz, une véritable source de connaissances.
            </p> */}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain />}
              title="Quiz en développement"
              description="Tous les jours, découvrez des dizaines de nouvelles questions portant sur différents sujets variés."
            />
            <FeatureCard
              icon={<Trophy />}
              title="Compétition"
              description="Un classement en temps réel. Devenez le numéro 1 et gagnez des récompenses exclusives."
            />
            <FeatureCard
              icon={<Star />}
              title="Progression RPG"
              description="Gagnez de l'XP, montez de niveau et débloquez des badges uniques."
            />
          </div>
        </div>
      </section>

      {/* Bataille -------------------------------------------------- */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-900/20"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-10">
            Entrez dans la bataille
          </h2>
          {/* <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            Prouvez que vous êtes le meilleur.
          </p> */}
          <Link to="/challenges">
            <Button className="text-lg px-10 py-6 h-auto shadow-[0_0_40px_rgba(99,102,241,0.5)] hover:shadow-[0_0_60px_rgba(99,102,241,0.7)] transition-all">
              Commencer le combat
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
