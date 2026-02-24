import { Layout } from "../components/Layout";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const handleSignIn = async (formDate: FormData) => {
    await authClient.signIn.email(
      {
        email: formDate.get("email") as string,
        password: formDate.get("password") as string,
      },
      {
        onSuccess: () => {
          toast.success("Connexion réussie !");
          navigate("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-[calc(90vh-200px)]">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Connexion
          </h2>
          <p className="mt-2 text-center text-sm text-slate-300">
            Ou{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors"
            >
              créez un nouveau compte
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-900/50 border border-slate-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action={handleSignIn}>
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-300"
                >
                  Mot de passe
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-700 rounded-md bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-600 bg-slate-800 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-slate-300"
                  >
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-500 hover:text-indigo-400"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full">
                  Se connecter
                </Button>
              </div>
            </form>

            {/* Inclure les boutons de connexion avec Google et Facebook (plus tard) */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
