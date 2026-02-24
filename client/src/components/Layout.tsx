import React, { useState } from "react";
import {
  Coins,
  ChevronDown,
  User,
  LogOut,
  Home,
  Trophy,
  Gamepad2,
  ShoppingBag,
  Map,
} from "lucide-react";
import { Button } from "./ui/Button";
import { NavLink, useLocation } from "react-router-dom";
import { CookieBanner } from "./CookieBanner";
import { KromaLogo } from "./Logo";

import { useAuth } from "../context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, loading, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Helper pour savoir si un lien est actif
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-200 selection:bg-indigo-500/30">
      {/* Background Decoratif (Grid pattern) -------------------------------------------------- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
      </div>

      {/* Navigation Desktop -------------------------------------------------- */}
      <nav className="relative z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <NavLink to="/" className="flex items-center gap-2">
                <KromaLogo />
              </NavLink>
            </div>

            {/* Desktop Navigation -------------------------------------------------- */}
            <div className="hidden md:flex items-center gap-8 font-medium">
              <NavLink to="/how-it-works" className="nav-link">
                Comment ça marche
              </NavLink>
              <NavLink to="/leaderboard" className="nav-link">
                Classement
              </NavLink>
              <NavLink to="/roadmap" className="nav-link">
                Roadmap
              </NavLink>
              {user && (
                <NavLink to="/challenges" className="nav-link">
                  Quiz
                </NavLink>
              )}

              {user && (
                <>
                  <NavLink to="/social" className="nav-link">
                    Social
                  </NavLink>
                  <NavLink to="/shop" className="nav-link">
                    Boutique
                  </NavLink>
                </>
              )}
            </div>

            <div className="flex items-center gap-4">
              {loading ? <></> : <></>}
              {user ? (
                <>
                  <div className="relative">
                    {isMenuOpen && (
                      <div
                        className="fixed inset-0 z-40 cursor-default"
                        onClick={() => setIsMenuOpen(false)}
                      />
                    )}

                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="hidden md:flex items-center gap-2 text-slate-200 hover:text-white transition-colors font-medium outline-none relative z-50"
                    >
                      <span>{user.name}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          isMenuOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl py-1 z-50 overflow-hidden transform origin-top-right transition-all animate-in fade-in zoom-in-95 duration-200">
                        <NavLink
                          to="/profile"
                          className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User size={16} />
                          Voir le profil
                        </NavLink>
                        <button
                          onClick={() => {
                            signOut();
                            setIsMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Se déconnecter
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                    <Coins size={16} />
                    <span>{user.coins ?? 0}</span>
                  </div>

                  <div className="flex items-center gap-1 text-red-500 font-bold bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                    <span className="text-lg">❤️</span>
                    <span>{user.hearts ?? 3}</span>
                  </div>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="text-sm font-medium hover:text-white transition-colors hidden md:block"
                  >
                    Connexion
                  </NavLink>
                  <NavLink to="/register" className="hidden md:block">
                    <Button
                      variant="primary"
                      className="py-2 px-4 text-sm font-medium"
                    >
                      Commencer
                    </Button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content -------------------------------------------------- */}
      <main className="relative z-10 flex-1 pb-20 md:pb-0">{children}</main>

      {/* Footer (Desktop only) -------------------------------------------------- */}
      <footer className="relative z-10 h-16 border-t border-slate-800 bg-slate-950 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-slate-500 text-sm">
          <div className="hidden sm:block w-1/3"></div>
          <p className="w-full sm:w-1/3 text-center">
            © {new Date().getFullYear()} KROMA. Tous droits réservés.
          </p>

          <div className="hidden sm:flex w-1/3 justify-end gap-6">
            <NavLink to="/terms" className="hover:text-white transition-colors">
              Conditions d'utilisation
            </NavLink>
            <NavLink
              to="/privacy"
              className="hover:text-white transition-colors"
            >
              Confidentialité
            </NavLink>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation -------------------------------------------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800">
        <div className="flex justify-around items-center h-16 px-2">
          {/* Accueil */}
          <NavLink
            to="/"
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
              isActive("/")
                ? "text-indigo-400 bg-indigo-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Home size={22} />
            <span className="text-[10px] mt-1 font-medium">Accueil</span>
          </NavLink>

          {/* Classement */}
          <NavLink
            to="/leaderboard"
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
              isActive("/leaderboard")
                ? "text-indigo-400 bg-indigo-500/10"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Trophy size={22} />
            <span className="text-[10px] mt-1 font-medium">Classement</span>
          </NavLink>

          {/* Quiz (uniquement si connecté) */}
          {user ? (
            <NavLink
              to="/challenges"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/challenges")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Gamepad2 size={22} />
              <span className="text-[10px] mt-1 font-medium">Quiz</span>
            </NavLink>
          ) : (
            <NavLink
              to="/how-it-works"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/how-it-works")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Gamepad2 size={22} />
              <span className="text-[10px] mt-1 font-medium">Guide</span>
            </NavLink>
          )}

          {/* Boutique ou Roadmap */}
          {user ? (
            <NavLink
              to="/shop"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/shop")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <ShoppingBag size={22} />
              <span className="text-[10px] mt-1 font-medium">Boutique</span>
            </NavLink>
          ) : (
            <NavLink
              to="/roadmap"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/roadmap")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Map size={22} />
              <span className="text-[10px] mt-1 font-medium">Roadmap</span>
            </NavLink>
          )}

          {/* Profil */}
          {user ? (
            <NavLink
              to="/profile"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/profile")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User size={22} />
              <span className="text-[10px] mt-1 font-medium">Profil</span>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all ${
                isActive("/login")
                  ? "text-indigo-400 bg-indigo-500/10"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <User size={22} />
              <span className="text-[10px] mt-1 font-medium">Connexion</span>
            </NavLink>
          )}
        </div>
      </nav>

      <CookieBanner />
    </div>
  );
};
