import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

import { formatDate } from "../../utils/formatDate";
import type { FeedActivity } from "../../services/social.service";

interface FeedItemProps {
  activity: FeedActivity;
}

export function FeedItem({ activity }: FeedItemProps) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/30 rounded-2xl p-5 flex gap-5 hover:border-indigo-500/40 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors"></div>

      <Link to={`/profile/${activity.user.id}`} className="relative block">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-lg ring-1 ring-slate-700 shadow-xl group-hover:scale-110 transition-transform duration-300 overflow-hidden">
          {activity.user.image ? (
            <img
              src={activity.user.image}
              alt={activity.user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            activity.user.name.substring(0, 2).toUpperCase()
          )}
        </div>
      </Link>

      <div className="flex-1 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
          <Link
            to={`/profile/${activity.user.id}`}
            className="flex items-center gap-2 w-fit"
          >
            <span className="text-white font-bold text-lg group-hover:text-indigo-400 transition-colors">
              {activity.user.name}
            </span>
            <span className="h-1 w-1 bg-slate-600 rounded-full"></span>
            <span className="text-xs text-slate-500 font-medium">
              @{activity.user.name.toLowerCase().replace(" ", "")}
            </span>
          </Link>

          <span className="text-[10px] text-slate-500 font-mono bg-slate-900/50 px-2 py-1 rounded-md border border-slate-800">
            {formatDate(activity.completedAt)}
          </span>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 flex items-center justify-between group-hover:bg-slate-900/60 transition-colors">
          <div className="flex flex-col">
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider mb-0.5">
              Challenge terminé
            </span>
            <span className="text-slate-200 font-medium">
              {activity.challenge.title}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20 shadow-sm shadow-indigo-500/5">
            <Zap size={14} className="text-indigo-400 fill-indigo-400" />
            <span className="text-sm text-indigo-300 font-bold">
              +{activity.challenge.xp}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
