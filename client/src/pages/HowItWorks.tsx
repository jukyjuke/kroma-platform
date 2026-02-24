import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { Trophy, Heart, Coins, Zap, Target } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function HowItWorks() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-20 px-4 pb-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Bienvenue sur KROMA, la plateforme d'entraînement ultime pour la
            connaissance. Voici tout ce que tu dois savoir pour dominer le
            classement.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section 1: Quiz --------------------------------------------------*/}
          <section className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-400">
                <Target size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Des Défis Uniques
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg">
                Affronte des quiz chronométrés pour tester tes compétences.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full"></div>
                <Target size={120} className="relative text-indigo-400" />
              </div>
            </div>
          </section>

          {/* Section 2: Coeurs -------------------------------------------------- */}
          <section className="flex flex-col md:flex-row-reverse gap-8 items-center">
            <div className="flex-1">
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <Heart size={32} fill="currentColor" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Le Système Pay-to-Play
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg mb-4">
                Lancer un quiz coûte{" "}
                <span className="text-red-400 font-bold">1 vie</span>. C'est un
                engagement : si tu abandonnes ou perds, la vie est perdue.
              </p>
              <div className="bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                <p className="text-red-200 font-medium">
                  🏆 <span className="text-white">Mais si tu gagnes...</span> la
                  vie t'est remboursée !
                </p>
              </div>
              <p className="text-slate-500 text-sm mt-4">
                Tes vies se régénèrent automatiquement toutes les 8 heures (max
                3). Tu peux dépasser cette limite en achetant des vies dans la
                boutique (max 5).
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
                <Heart
                  size={120}
                  className="relative text-red-500 animate-pulse"
                  fill="currentColor"
                />
              </div>
            </div>
          </section>

          {/* Section 3: Boutique -------------------------------------------------- */}
          <section className="bg-slate-900/30 border border-slate-800 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-1 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
                    <Coins size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Économie & Boutique
                  </h2>
                </div>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start gap-3">
                    <Zap className="text-yellow-500 mt-1 shrink-0" size={18} />
                    <span>Gagne des pièces en complétant des quiz.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Trophy
                      className="text-yellow-500 mt-1 shrink-0"
                      size={18}
                    />
                    <span>
                      Reçois un lot de pièces bonus à chaque passage de niveau.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Coins
                      className="text-yellow-500 mt-1 shrink-0"
                      size={18}
                    />
                    <span>
                      Dépense tes pièces dans la{" "}
                      <strong className="text-white">Boutique</strong> pour
                      recharger tes coeurs instantanément.
                    </span>
                  </li>
                </ul>
                <div className="mt-8">
                  <Link to="/shop">
                    <Button variant="outline">Visiter la Boutique</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
