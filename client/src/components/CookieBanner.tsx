import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setIsVisible(false);
    localStorage.setItem("cookie-consent", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-96 z-[100]"
        >
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-5 rounded-2xl shadow-2xl flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="bg-indigo-500/20 p-2 rounded-lg text-indigo-400">
                <Cookie size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">
                  Cookies & Performance
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Nous utilisons uniquement des cookies pour garantir la
                  rapidité et la fluidité de KROMA. Aucune donnée personnelle
                  n'est collectée à des fins publicitaires.
                </p>
              </div>
              <button
                onClick={() => setIsVisible(false)}
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Fermer la bannière de cookies"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex gap-3">
              <Button
                variant="primary"
                className="w-full py-2 text-sm"
                onClick={handleAccept}
              >
                C'est compris !
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
