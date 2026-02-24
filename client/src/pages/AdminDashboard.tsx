import { Layout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Plus } from "lucide-react";

export default function AdminDashboard() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user || user.role !== "ADMIN") {
    return (
      <Layout>
        <div className="pt-20 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Accès Refusé 🚫</h1>
          <p className="mb-4">Vous n'avez pas les droits d'administrateur.</p>
          <div className="bg-slate-900 p-4 rounded-lg inline-block text-left mb-6">
            <p>
              <span className="text-slate-400">Votre ID :</span> {user?.id}
            </p>
            <p>
              <span className="text-slate-400">Votre Rôle :</span>{" "}
              <span className="font-mono text-yellow-400">
                {user?.role || "undefined"}
              </span>
            </p>
          </div>
          <p className="text-sm text-slate-500 mb-8">
            Conseil : Déconnectez-vous et reconnectez-vous si vous venez de
            changer votre rôle.
          </p>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <Link to="/admin/create-quiz">
            <Button className="flex items-center gap-2">
              <Plus size={18} /> Créer un Quiz
            </Button>
          </Link>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Gestion des Quiz
          </h2>
          <p className="text-slate-400 mb-4">
            Fonctionnalité de liste et suppression à venir. Pour l'instant,
            concentrez-vous sur la création.
          </p>
          {/* TODO: liste des quiz avec options */}
        </div>
      </div>
    </Layout>
  );
}
