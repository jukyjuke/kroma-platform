import { Layout } from "../components/Layout";
import { Swords, Trophy, Crown } from "lucide-react";

export default function ProductRoadmap() {
  const steps = [
    {
      title: "1v1 en Temps Réel",
      description:
        "Défie tes amis ou des adversaires aléatoires dans des batailles de culture générale. Le plus rapide et le plus précis l'emporte.",
      icon: <Swords size={32} className="text-red-500" />,
      date: "Q2 2026",
      status: "coming-soon",
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Tournois Hebdomadaires",
      description:
        "Inscris-toi aux tournois officiels, gravis les échelons et remporte des prix exclusifs (badges, pièces, et plus encore).",
      icon: <Trophy size={32} className="text-yellow-500" />,
      date: "Q3 2026",
      status: "planned",
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Mode Classé",
      description:
        "Grimpe dans le ladder. Du rang Void au rang Kroma. Prouve que tu es le meilleur de la plateforme.",
      icon: <Crown size={32} className="text-purple-500" />,
      date: "Q4 2026",
      status: "planned",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pt-20 px-4 pb-20">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Le Futur de KROMA
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Voici un aperçu des fonctionnalités qui arriveront bientôt sur la
            plateforme.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-800 hidden md:block"></div>

          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className="flex-1 w-full md:w-1/2 text-center md:text-left px-4 group">
                  <div
                    className={`p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 relative overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${step.color} transition-opacity duration-500`}
                    ></div>
                    <div className="relative z-10 flex flex-col items-center md:items-start">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
                          {step.date}
                        </span>
                        {/* <span className="flex items-center gap-1 text-xs font-bold text-indigo-400 uppercase tracking-widest">
                                <Clock size={12} /> Bientôt
                            </span> */}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-slate-950 border-4 border-slate-800 flex items-center justify-center relative z-20 shadow-xl">
                  {step.icon}
                </div>

                <div className="flex-1 w-full md:w-1/2 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
