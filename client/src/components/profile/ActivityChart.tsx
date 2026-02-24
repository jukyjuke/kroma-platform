import { Activity } from "lucide-react";

interface ActivityChartProps {
  activityData: number[];
}

export function ActivityChart({ activityData }: ActivityChartProps) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <Activity className="text-indigo-500" /> Activité
      </h3>
      <div className="h-48 flex items-end justify-between gap-1">
        {activityData.map((count, i) => {
          const maxCount = Math.max(...activityData, 5);
          const heightPercent = (count / maxCount) * 100;
          return (
            <div
              key={i}
              className="w-full bg-indigo-500/20 hover:bg-indigo-500 rounded-t-sm transition-all duration-300 group relative"
              style={{
                height: `${Math.max(heightPercent, count > 0 ? 5 : 0)}%`,
              }}
            >
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50 pointer-events-none">
                {count} challenge{count > 1 ? "s" : ""}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
        <span>Il y a 15 jours</span>
        <span>Aujourd'hui</span>
      </div>
    </div>
  );
}
