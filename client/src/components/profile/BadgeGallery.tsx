import { Award } from "lucide-react";
import { BADGES } from "../../constants/badges";

interface BadgeGalleryProps {
  badges?: string[];
}

export function BadgeGallery({ badges }: BadgeGalleryProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <Award className="text-yellow-500" /> Trophées Récents
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges && badges.length > 0 ? (
          badges.map((badgeId) => {
            const badge = BADGES[badgeId];
            if (!badge) return null;
            return (
              <div
                key={badge.id}
                className="flex flex-col items-center justify-center p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition cursor-help relative group"
              >
                <img
                  src={badge.image}
                  alt={badge.name}
                  className="h-12 mb-3 drop-shadow-[0_0_8px_rgba(234,179,8,0.3)]"
                />
                <span className="text-sm font-medium text-slate-300 text-center">
                  {badge.name}
                </span>
                <div className="absolute bottom-full mb-2 bg-black/90 text-white text-xs p-2 rounded w-32 text-center opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                  {badge.description}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-8 text-center text-slate-500 italic text-sm">
            Aucun trophée débloqué pour le moment. Continue à relever des
            challenges !
          </div>
        )}
      </div>
    </div>
  );
}
