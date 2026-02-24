import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { leaderboardService } from "../services/leaderboard.service";
import type { LeaderboardUser } from "../services/leaderboard.service";
import { socialService } from "../services/social.service";

export function useLeaderboard() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await leaderboardService.getGlobal();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFollowing = async () => {
      if (!currentUser) return;
      try {
        const data = await socialService.getFollowing(currentUser.id);
        if (data.success) {
          setFollowingIds(new Set(data.data.map((u: { id: string }) => u.id)));
        }
      } catch (error) {
        console.error("Failed to fetch following", error);
      }
    };

    fetchLeaderboard();
    fetchFollowing();
  }, [currentUser]);

  const handleFollow = async (targetId: string) => {
    if (!currentUser) return;
    setFollowLoading(targetId);
    const isFollowing = followingIds.has(targetId);

    try {
      const response = isFollowing
        ? await socialService.unfollow(targetId)
        : await socialService.follow(targetId);

      if (response.success) {
        setFollowingIds((prev) => {
          const next = new Set(prev);
          if (isFollowing) next.delete(targetId);
          else next.add(targetId);
          return next;
        });
      }
    } catch (error) {
      console.error("Follow action failed", error);
    } finally {
      setFollowLoading(null);
    }
  };

  return {
    currentUser,
    users,
    followingIds,
    loading,
    followLoading,
    handleFollow,
  };
}
