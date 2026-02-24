import {
  Mail,
  Lock,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface SettingsFormProps {
  user: any;
  newEmail: string;
  setNewEmail: (email: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  isUpdating: boolean;
  message: { type: "success" | "error"; text: string } | null;
  showDeleteConfirm: boolean;
  setShowDeleteConfirm: (show: boolean) => void;
  handleUpdateEmail: (e: React.FormEvent) => void;
  handleUpdatePassword: (e: React.FormEvent) => void;
  handleDeleteAccount: () => void;
}

export function SettingsForm({
  user,
  newEmail,
  setNewEmail,
  newPassword,
  setNewPassword,
  isUpdating,
  message,
  showDeleteConfirm,
  setShowDeleteConfirm,
  handleUpdateEmail,
  handleUpdatePassword,
  handleDeleteAccount,
}: SettingsFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-2">
          Paramètres du compte
        </h3>
        <p className="text-slate-300 text-sm">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      {message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 border ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <Mail size={18} className="text-indigo-400" /> Adresse Email
          </h4>
          <form onSubmit={handleUpdateEmail} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 ml-1">
                Email actuel : {user.email}
              </label>
              <input
                type="email"
                placeholder="Nouvel email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isUpdating && <Loader2 size={16} className="animate-spin" />}
              Mettre à jour l'email
            </button>
          </form>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2">
            <Lock size={18} className="text-purple-400" /> Mot de passe
          </h4>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 ml-1">
                &nbsp;
              </label>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold py-2 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {isUpdating && <Loader2 size={16} className="animate-spin" />}
              Changer le mot de passe
            </button>
          </form>
        </div>
      </div>

      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
        <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
          <Trash2 size={18} /> Zone de danger
        </h4>
        <p className="text-slate-300 text-sm mb-4">
          La suppression de votre compte est irréversible. Toutes vos données
          seront définitivement effacées.
        </p>

        {!showDeleteConfirm ? (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 font-bold py-2 px-6 rounded-xl transition-all"
          >
            Supprimer mon compte
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
            <p className="text-red-400 text-sm font-bold flex-1">
              Êtes-vous absolument sûr ?
            </p>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 sm:flex-none px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isUpdating}
                className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                {isUpdating && <Loader2 size={16} className="animate-spin" />}
                Confirmer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
