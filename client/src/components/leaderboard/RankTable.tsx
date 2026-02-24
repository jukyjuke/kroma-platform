import { UserPlus, UserMinus, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { type UserWithXP } from "../../context/AuthContext";

import { getLevelInfo } from "../../utils/levelSystem";
import type { LeaderboardUser } from "../../services/leaderboard.service";

interface RankTableProps {
  users: LeaderboardUser[];
  currentUser: UserWithXP | null;
  followingIds: Set<string>;
  followLoading: string | null;
  handleFollow: (targetId: string) => void;
}

export function RankTable({
  users,
  currentUser,
  followingIds,
  followLoading,
  handleFollow,
}: RankTableProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800/50 text-slate-300 text-xs md:text-sm border-b border-slate-800 uppercase tracking-wider">
              <th className="py-4 px-6 font-semibold">Rang</th>
              <th className="py-4 px-6 font-semibold">Joueur</th>
              <th className="py-4 px-6 font-semibold text-center">Niveau</th>
              <th className="py-4 px-6 font-semibold text-right">XP Total</th>
              {currentUser && (
                <th className="py-4 px-6 font-semibold text-center">Action</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.length > 0 ? (
              users.map((user) => {
                const levelInfo = getLevelInfo(user.xp);
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-4 px-6 text-slate-400 font-mono font-bold group-hover:text-white transition-colors">
                      #{user.rank}
                    </td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/profile/${user.id}`}
                        className="flex items-center gap-3 w-fit"
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs md:text-sm font-bold text-white ring-2 ring-slate-900 overflow-hidden">
                          {user.image ? (
                            <img src={user.image} alt={user.name} />
                          ) : (
                            user.name.substring(0, 2).toUpperCase()
                          )}
                        </div>
                        <span className="text-slate-200 font-medium group-hover:text-indigo-400 transition-colors truncate max-w-[150px] md:max-w-none">
                          {user.name}
                        </span>
                      </Link>
                    </td>

                    <td className="py-4 px-6 text-center">
                      <span className="inline-block bg-slate-800 text-slate-300 text-[10px] md:text-xs px-2 py-1 rounded border border-slate-700 font-semibold">
                        Lvl {levelInfo.level}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-indigo-400 font-bold text-sm md:text-base">
                      {user.xp.toLocaleString()}{" "}
                      <span className="text-[10px] md:text-xs text-slate-500">
                        XP
                      </span>
                    </td>
                    {currentUser && (
                      <td className="py-4 px-6 text-center">
                        {currentUser.id !== user.id && (
                          <button
                            onClick={() => handleFollow(user.id)}
                            disabled={followLoading === user.id}
                            className={`p-2 rounded-lg transition-all duration-200 cursor-pointer ${
                              followingIds.has(user.id)
                                ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                                : "bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white"
                            }`}
                            aria-label={
                              followingIds.has(user.id)
                                ? "Ne plus suivre"
                                : "Suivre"
                            }
                            title={
                              followingIds.has(user.id)
                                ? "Ne plus suivre"
                                : "Suivre"
                            }
                          >
                            {followLoading === user.id ? (
                              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            ) : followingIds.has(user.id) ? (
                              <>
                                <UserCheck
                                  size={20}
                                  className="group-hover:hidden"
                                />
                                <UserMinus
                                  size={20}
                                  className="hidden group-hover:block"
                                />
                              </>
                            ) : (
                              <UserPlus size={20} />
                            )}
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={currentUser ? 5 : 4}
                  className="py-12 text-center text-slate-500 italic"
                >
                  Aucun joueur dans le classement pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
