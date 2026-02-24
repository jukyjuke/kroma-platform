import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-full"></div>
          <AlertTriangle className="relative z-10 w-24 h-24 text-indigo-500 mx-auto" />
        </div>

        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-6">Page introuvable</h2>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Oups ! Il semblerait que vous vous soyez aventuré dans une zone
          inexplorée de la carte. Cette page n'existe pas.
        </p>

        <Link to="/">
          <Button variant="primary">Retour en terrain connu</Button>
        </Link>
      </div>
    </Layout>
  );
}
