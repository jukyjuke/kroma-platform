import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Loader2, ArrowLeft } from "lucide-react";
import { userService } from "../services/user.service";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { StatsCards } from "../components/profile/StatsCards";
import { BadgeGallery } from "../components/profile/BadgeGallery";
import { ActivityChart } from "../components/profile/ActivityChart";
import { type UserWithXP } from "../context/AuthContext";

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserWithXP | null>(null);
  const [activityData, setActivityData] = useState<number[]>(Array(15).fill(0));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileRes = await userService.getProfile(id);
        const activityRes = await userService.getRecentActivity(id);

        if (profileRes.success) {
          setUser(profileRes.data);
        }
        if (activityRes.success) {
          setActivityData(activityRes.data);
        }
      } catch (err: unknown) {
        console.error("Failed to fetch profile:", err);
        setError("Chargement du profil impossible.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !user) {
    return (
      <Layout>
        <div className="pt-20 text-center text-white">
          <h1 className="text-2xl mb-4">{error || "Utilisateur non trouvé"}</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-400 hover:underline flex items-center justify-center gap-2 mx-auto"
          >
            <ArrowLeft size={18} /> Retour
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" /> Retour
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar user={user} isPublic={true} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <StatsCards
              completedChallengesCount={user.completedChallengesCount ?? 0}
              xp={user.xp ?? 0}
              badgesCount={user.badges?.length ?? 0}
            />
            <BadgeGallery badges={user.badges} />
            <ActivityChart activityData={activityData} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
