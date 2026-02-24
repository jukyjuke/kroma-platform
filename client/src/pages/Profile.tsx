import { Layout } from "../components/Layout";
import { Loader2 } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { ProfileSidebar } from "../components/profile/ProfileSidebar";
import { StatsCards } from "../components/profile/StatsCards";
import { BadgeGallery } from "../components/profile/BadgeGallery";
import { ActivityChart } from "../components/profile/ActivityChart";
import { SettingsForm } from "../components/profile/SettingsForm";

export default function Profile() {
  const {
    user,
    loading,
    activeTab,
    setActiveTab,
    newEmail,
    setNewEmail,
    newPassword,
    setNewPassword,
    isUpdating,
    message,
    showDeleteConfirm,
    setShowDeleteConfirm,
    activityData,
    handleUpdateEmail,
    handleUpdatePassword,
    handleDeleteAccount,
  } = useProfile();

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  return (
    <Layout>
      <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <>
                <StatsCards
                  completedChallengesCount={user.completedChallengesCount ?? 0}
                  xp={user.xp ?? 0}
                  badgesCount={user.badges?.length ?? 0}
                />
                <BadgeGallery badges={user.badges} />
                <ActivityChart activityData={activityData} />
              </>
            )}

            {activeTab === "settings" && (
              <SettingsForm
                user={user}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                isUpdating={isUpdating}
                message={message}
                showDeleteConfirm={showDeleteConfirm}
                setShowDeleteConfirm={setShowDeleteConfirm}
                handleUpdateEmail={handleUpdateEmail}
                handleUpdatePassword={handleUpdatePassword}
                handleDeleteAccount={handleDeleteAccount}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
