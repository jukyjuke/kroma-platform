import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <Layout>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[calc(100vh-200px)]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Mot de passe oublié ?
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Entrez votre adresse email et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-900/50 border border-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Adresse email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="vous@exemple.com"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Envoyer le lien de réinitialisation
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700" />
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="flex items-center justify-center text-sm font-medium text-indigo-500 hover:text-indigo-400 transition-colors gap-2 pt-5"
                >
                  <ArrowLeft size={16} /> Retour à la connexion
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
