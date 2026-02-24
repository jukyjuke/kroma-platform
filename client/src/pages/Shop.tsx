import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user.service";
import { toast } from "sonner";
import { Heart, Coins } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ShoppingBag } from "lucide-react";

export default function Shop() {
  const { user, refetchSession } = useAuth();

  const handleBuyHeart = async () => {
    try {
      const res = await userService.buyHeart();
      if (res.success) {
        toast.success(res.message);
        refetchSession();
      } else {
        toast.error(res.message || "Erreur lors de l'achat");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Erreur lors de l'achat");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ShoppingBag className="text-indigo-500" size={40} /> Boutique
        </h1>
        <p className="text-slate-300 mb-8">
          Dépense tes pièces pour obtenir des avantages
        </p>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Solde</h2>
            <p className="text-slate-300">Pièces disponibles</p>
          </div>
          <div className="flex items-center gap-3 text-yellow-400 text-3xl font-bold font-mono">
            <Coins size={32} />
            {user?.coins || 0}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heart Item -------------------------------------------------- */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center hover:border-indigo-500/50 transition-colors">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500">
              <Heart size={32} fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Recharge de Coeur
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Récupère 1 coeur instantanément pour continuer à combattre !
            </p>

            <div className="mt-auto w-full">
              <div className="flex items-center justify-center gap-2 text-yellow-400 font-bold mb-4 font-mono">
                <Coins size={16} /> 50
              </div>
              <Button
                onClick={handleBuyHeart}
                disabled={
                  !user || (user.hearts ?? 0) >= 5 || (user.coins ?? 0) < 50
                }
                className="w-full"
                variant={(user?.hearts ?? 0) >= 5 ? "secondary" : "primary"}
              >
                {(user?.hearts ?? 0) >= 5 ? "Coeurs au max" : "Acheter"}
              </Button>
            </div>
          </div>

          {/* Coming Soon Item -------------------------------------------------- */}
          <div className="bg-slate-800/20 border border-slate-800 rounded-2xl p-6 flex flex-col items-center text-center opacity-70  cursor-not-allowed">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-4 text-indigo-400">
              <span className="text-2xl">?</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Bientôt...</h3>
            <p className="text-slate-400 text-sm mb-6">
              De nouveaux objets seront bientôt disponibles !
            </p>
            <div className="mt-auto w-full">
              <Button
                disabled
                variant="secondary"
                className="w-full opacity-50"
              >
                Indisponible
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
