import { Layout } from "../components/Layout";
import { Loader2, Users, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSocialFeed } from "../hooks/useSocialFeed";
import { FeedItem } from "../components/social/FeedItem";

export default function Social() {
  const navigate = useNavigate();
  const { feedData, loading } = useSocialFeed();

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white flex items-center gap-4">
              <Users className="text-indigo-500 w-10 h-10" /> Fil d'actualité
            </h1>
            <p className="text-slate-300 text-lg">
              Suivez les progrès et succès de la communauté.
            </p>
          </div>
          <button
            onClick={() => navigate("/leaderboard")}
            className="group flex items-center gap-3 bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 px-6 py-3 rounded-2xl text-slate-300 transition-all duration-300 cursor-pointer"
          >
            <Trophy className="text-yellow-500 group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                Explorer
              </div>
              <div className="font-bold">Voir le classement</div>
            </div>
          </button>
        </div>

        <div className="space-y-8 relative">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400 animate-pulse">
                Chargement de votre fil d'actualité...
              </p>
            </div>
          ) : feedData.length > 0 ? (
            <div className="space-y-6">
              {feedData.map((activity, idx) => (
                <FeedItem key={idx} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 bg-slate-900/30 rounded-3xl border-2 border-dashed border-slate-800 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={40} className="text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">
                Votre fil est bien calme...
              </h3>
              <p className="mb-8 text-slate-400 max-w-sm mx-auto">
                Commencez à suivre d'autres utilisateurs pour voir leurs
                accomplissements s'afficher ici !
              </p>
              <button
                onClick={() => navigate("/leaderboard")}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
              >
                Découvrir des membres
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
