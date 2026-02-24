import {
  User as UserIcon,
  Settings,
  Calendar,
  Zap,
  Youtube,
  Instagram,
} from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { getLevelInfo, calculateProgress } from "../../utils/levelSystem";
import { type UserWithXP } from "../../context/AuthContext";

interface ProfileSidebarProps {
  user: UserWithXP;
  activeTab?: "overview" | "settings";
  setActiveTab?: (tab: "overview" | "settings") => void;
  isPublic?: boolean;
}

export function ProfileSidebar({
  user,
  activeTab,
  setActiveTab,
  isPublic,
}: ProfileSidebarProps) {
  const xp = user.xp ?? 0;
  const levelInfo = getLevelInfo(xp);
  const progress = calculateProgress(xp);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center lg:text-left sticky top-24 backdrop-blur-sm">
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1">
          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
      <p className="text-indigo-400 font-medium mb-3">
        @{user.email?.split("@")[0]} • Niveau {levelInfo.level} -{" "}
        {levelInfo.title}
      </p>

      {(activeTab === "overview" || isPublic) && (
        <>
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>{xp} XP</span>
              <span>{levelInfo.maxXp} XP</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-xs text-slate-500">
              Plus que{" "}
              <span className="text-white font-medium">
                {Math.round(levelInfo.maxXp - xp)} XP
              </span>{" "}
              avant le niveau suivant
            </div>
          </div>

          <div className="flex justify-center lg:justify-start gap-4 mb-8">
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700 transition"
              aria-label="Youtube"
            >
              <Youtube size={20} />
            </a>
            <a
              href="#"
              className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-700 transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
        </>
      )}

      {!isPublic && setActiveTab && (
        <div className="flex flex-col gap-2 mb-8">
          <TabButton
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<UserIcon size={18} />}
            label="Vue d'ensemble"
          />
          <TabButton
            active={activeTab === "settings"}
            onClick={() => setActiveTab("settings")}
            icon={<Settings size={18} />}
            label="Paramètres"
          />
        </div>
      )}

      {(activeTab === "overview" || isPublic) && (
        <div className="space-y-4 border-t border-slate-800 pt-6">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar size={16} /> Membre depuis
            </span>
            <span className="text-white">
              {formatDate(user.createdAt).charAt(0).toUpperCase() +
                formatDate(user.createdAt).slice(1)}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 flex items-center gap-2">
              <Zap size={16} /> Streak Actuel
            </span>
            <span className="text-orange-400 font-bold">
              {user.streak ?? 0} {(user.streak ?? 0) > 1 ? "jours" : "jour"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 ${
        active
          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          : "text-slate-400 hover:bg-slate-800"
      }`}
    >
      {icon} {label}
    </button>
  );
}
