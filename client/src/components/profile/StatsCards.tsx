interface StatsCardsProps {
  completedChallengesCount: number;
  xp: number;
  badgesCount: number;
}

export function StatsCards({
  completedChallengesCount,
  xp,
  badgesCount,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <StatCard value={completedChallengesCount} label="Challenges terminés" />
      <StatCard value={xp} label="Total XP" colorClass="text-indigo-400" />
      <StatCard
        value="-"
        label="Roadmaps terminées"
        colorClass="text-green-400"
      />
      <StatCard
        value={badgesCount}
        label="Trophées"
        colorClass="text-yellow-500"
      />
    </div>
  );
}

function StatCard({
  value,
  label,
  colorClass = "text-white",
}: {
  value: string | number;
  label: string;
  colorClass?: string;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl text-center backdrop-blur-sm">
      <div className={`text-3xl font-bold ${colorClass} mb-1`}>{value}</div>
      <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  );
}
