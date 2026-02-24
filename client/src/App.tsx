import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Challenges = lazy(() => import("./pages/Challenges"));
const ChallengeDetails = lazy(() => import("./pages/ChallengeDetails"));
const ChallengePlay = lazy(() => import("./pages/ChallengePlay"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Social = lazy(() => import("./pages/Social"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Shop = lazy(() => import("./pages/Shop"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const ProductRoadmap = lazy(() => import("./pages/ProductRoadmap"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CreateQuiz = lazy(() => import("./pages/CreateQuiz"));

function App() {
  return (
    <>
      <Toaster position="bottom-center" richColors />
      <Suspense
        fallback={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <span className="ml-2 text-indigo-400 font-medium">
              Chargement...
            </span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/challenges"
            element={
              <ProtectedRoute>
                <Challenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/:id"
            element={
              <ProtectedRoute>
                <ChallengeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/challenges/:id/play"
            element={
              <ProtectedRoute>
                <ChallengePlay />
              </ProtectedRoute>
            }
          />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route
            path="/social"
            element={
              <ProtectedRoute>
                <Social />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/:id" element={<UserProfile />} />
          <Route
            path="/shop"
            element={
              <ProtectedRoute>
                <Shop />
              </ProtectedRoute>
            }
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/roadmap" element={<ProductRoadmap />} />

          {/* Admin Routes ------------------------------------------------------*/}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/create-quiz"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
