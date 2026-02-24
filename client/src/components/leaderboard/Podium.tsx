import { Crown, Medal, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

import type { LeaderboardUser } from "../../services/leaderboard.service";

interface PodiumProps {
  topUsers: LeaderboardUser[];
}

export function Podium({ topUsers }: PodiumProps) {
  if (topUsers.length === 0) return null;

  return (
    <div className="flex justify-center items-end gap-2 md:gap-4 mb-16 px-4">
      {/* 2nd Place ------------------------------------------------------ */}
      {topUsers[1] && (
        <Link
          to={`/profile/${topUsers[1].id}`}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-500 border-4 border-slate-700 flex items-center justify-center text-xl md:text-2xl font-bold text-white mb-2 relative hover:scale-105 transition-transform">
            {topUsers[1].name.substring(0, 2).toUpperCase()}
            <div className="absolute -top-3 bg-slate-700 text-slate-300 text-[10px] md:text-xs py-1 px-2 rounded-full border border-slate-600">
              #2
            </div>
          </div>
          <div className="h-24 md:h-32 w-20 md:w-24 bg-slate-800 rounded-t-lg flex items-end justify-center pb-4 border-t border-x border-slate-700">
            <Medal size={28} className="text-slate-400" />
          </div>
          <span className="text-slate-300 font-bold mt-2 text-xs md:text-sm truncate w-full text-center hover:text-indigo-400 transition-colors">
            {topUsers[1].name}
          </span>
          <span className="text-slate-500 text-[10px] md:text-xs">
            {topUsers[1].xp.toLocaleString()} XP
          </span>
        </Link>
      )}

      {/* 1st Place ------------------------------------------------------ */}
      {topUsers[0] && (
        <Link
          to={`/profile/${topUsers[0].id}`}
          className="flex flex-col items-center"
        >
          <Crown className="text-yellow-500 mb-2 animate-pulse" size={32} />
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-yellow-500 border-4 border-yellow-600 flex items-center justify-center text-2xl md:text-3xl font-bold text-white mb-2 relative shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:scale-105 transition-transform">
            {topUsers[0].name.substring(0, 2).toUpperCase()}
            <div className="absolute -top-3 bg-yellow-600 text-white text-[10px] md:text-xs py-1 px-2 rounded-full border border-yellow-400">
              #1
            </div>
          </div>
          <div className="h-32 md:h-40 w-24 md:w-28 bg-slate-800 rounded-t-lg flex items-end justify-center pb-4 border-t border-x border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent"></div>
            <Trophy size={36} className="text-yellow-500 relative z-10" />
          </div>
          <span className="text-white font-bold mt-2 text-sm md:text-base truncate w-full text-center hover:text-indigo-400 transition-colors">
            {topUsers[0].name}
          </span>
          <span className="text-yellow-500 text-xs md:text-sm font-bold">
            {topUsers[0].xp.toLocaleString()} XP
          </span>
        </Link>
      )}

      {/* 3rd Place ------------------------------------------------------ */}
      {topUsers[2] && (
        <Link
          to={`/profile/${topUsers[2].id}`}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-600 border-4 border-orange-800 flex items-center justify-center text-xl md:text-2xl font-bold text-white mb-2 relative hover:scale-105 transition-transform">
            {topUsers[2].name.substring(0, 2).toUpperCase()}
            <div className="absolute -top-3 bg-orange-800 text-orange-200 text-[10px] md:text-xs py-1 px-2 rounded-full border border-orange-700">
              #3
            </div>
          </div>
          <div className="h-20 md:h-24 w-20 md:w-24 bg-slate-800 rounded-t-lg flex items-end justify-center pb-4 border-t border-x border-slate-700">
            <Medal size={28} className="text-orange-600" />
          </div>
          <span className="text-slate-300 font-bold mt-2 text-xs md:text-sm truncate w-full text-center hover:text-indigo-400 transition-colors">
            {topUsers[2].name}
          </span>
          <span className="text-slate-500 text-[10px] md:text-xs">
            {topUsers[2].xp.toLocaleString()} XP
          </span>
        </Link>
      )}
    </div>
  );
}
