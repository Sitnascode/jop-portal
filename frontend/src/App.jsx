import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import JobDetailPage from "./pages/JobDetailPage.jsx";
import SeekerDashboard from "./pages/SeekerDashboard.jsx";
import EmployerDashboard from "./pages/EmployerDashboard.jsx";
import PostJobPage from "./pages/PostJobPage.jsx";
import JobApplicationsPage from "./pages/JobApplicationsPage.jsx";
import HelpCenterPage from "./pages/HelpCenterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.jsx";

function Shell({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">JP</span>
            </div>
            <span className="text-slate-900 font-bold text-xl">JobPortal</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link to="/jobs" className="text-slate-700 hover:text-primary">
              Jobs
            </Link>
            {user?.role === "JOB_SEEKER" && (
              <Link
                to="/dashboard/seeker"
                className="text-slate-700 hover:text-primary"
              >
                My Dashboard
              </Link>
            )}
            {user?.role === "EMPLOYER" && (
              <Link
                to="/dashboard/employer"
                className="text-slate-700 hover:text-primary"
              >
                Employer Panel
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 rounded bg-primary text-white hover:bg-blue-600"
                >
                  Sign up
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={logout}
                className="px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">{children}</div>
      </main>
      <footer className="border-t bg-slate-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">JobPortal</h3>
              <p className="text-slate-600 text-sm">
                Connecting talent with opportunity. Your career journey starts
                here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">
                For Job Seekers
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link to="/jobs" className="hover:text-blue-600">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-600">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/seeker" className="hover:text-blue-600">
                    My Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">
                For Employers
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link to="/post-job" className="hover:text-blue-600">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-blue-600">
                    Employer Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/employer"
                    className="hover:text-blue-600"
                  >
                    Employer Panel
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <Link to="/help" className="hover:text-blue-600">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-blue-600">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-blue-600">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} JobPortal. All rights reserved. Built
              with ❤️ for connecting talent with opportunity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Shell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/help" element={<HelpCenterPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route
            path="/dashboard/seeker"
            element={
              <ProtectedRoute role="JOB_SEEKER">
                <SeekerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/employer"
            element={
              <ProtectedRoute role="EMPLOYER">
                <EmployerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="EMPLOYER">
                <PostJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs/:jobId/applications"
            element={
              <ProtectedRoute role="EMPLOYER">
                <JobApplicationsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Shell>
    </AuthProvider>
  );
}
