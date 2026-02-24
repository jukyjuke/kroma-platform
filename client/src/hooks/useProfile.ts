import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user.service";

export function useProfile() {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "settings">(
    "overview",
  );

  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activityData, setActivityData] = useState<number[]>(Array(15).fill(0));

  useEffect(() => {
    const fetchActivity = async () => {
      if (!user) return;
      try {
        const data = await userService.getRecentActivity(user.id);
        if (data.success) {
          setActivityData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      }
    };

    if (!user && !loading) {
      navigate("/auth");
    } else if (user) {
      fetchActivity();
    }
  }, [user, loading, navigate]);

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdating(true);
    setMessage(null);
    try {
      const data = await userService.updateEmail(user.id, newEmail);
      if (data.success) {
        setMessage({ type: "success", text: "Email mis à jour avec succès !" });
        setNewEmail("");
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsUpdating(true);
    setMessage(null);
    try {
      const data = await userService.updatePassword(user.id, newPassword);
      if (data.success) {
        setMessage({
          type: "success",
          text: "Mot de passe mis à jour avec succès !",
        });
        setNewPassword("");
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Erreur lors de la mise à jour.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    setIsUpdating(true);
    try {
      const data = await userService.deleteAccount(user.id);
      if (data.success) {
        await signOut();
        navigate("/login");
      }
    } catch (error: unknown) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Erreur lors de la suppression.",
      });
    } finally {
      setIsUpdating(false);
      setShowDeleteConfirm(false);
    }
  };

  return {
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
    signOut,
  };
}
