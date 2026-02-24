import { useState, useEffect } from "react";
import { socialService } from "../services/social.service";
import type { FeedActivity } from "../services/social.service";

export function useSocialFeed() {
  const [feedData, setFeedData] = useState<FeedActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      const data = await socialService.getFeed();
      if (data.success) {
        setFeedData(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch feed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return {
    feedData,
    loading,
    refreshFeed: fetchFeed,
  };
}
