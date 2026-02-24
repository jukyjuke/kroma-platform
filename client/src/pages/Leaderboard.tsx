import { Layout } from "../components/Layout";
import { useLeaderboard } from "../hooks/useLeaderboard";
import { Podium } from "../components/leaderboard/Podium";
import { RankTable } from "../components/leaderboard/RankTable";

export default function Leaderboard() {
  const {
    currentUser,
    users,
    followingIds,
    loading,
    followLoading,
    handleFollow,
  } = useLeaderboard();

  if (loading) {
    return (
      <Layout>
        <div className="pt-32 text-center text-white">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          Chargement du classement...
        </div>
      </Layout>
    );
  }

  const top3 = users.slice(0, 3);

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex justify-center items-center gap-3 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Classement
          </h1>
        </div>

        <Podium topUsers={top3} />

        <RankTable
          users={users}
          currentUser={currentUser}
          followingIds={followingIds}
          followLoading={followLoading}
          handleFollow={handleFollow}
        />
      </div>
    </Layout>
  );
}
