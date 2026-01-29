import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("JOB_SEEKER");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Set role from URL parameter if provided
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam && ["JOB_SEEKER", "EMPLOYER"].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({ name, email, password, role });
      if (role === "JOB_SEEKER") navigate("/dashboard/seeker");
      else navigate("/dashboard/employer");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Join JobPortal
        </h1>
        <p className="text-slate-600">
          {role === "EMPLOYER"
            ? "Start hiring top talent today"
            : "Find your dream job today"}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-slate-700 mb-2"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-slate-700 mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email address"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-slate-700 mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Create a secure password"
            />
            <p className="text-xs text-slate-500 mt-1">
              Must be at least 6 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  role === "JOB_SEEKER"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="JOB_SEEKER"
                  checked={role === "JOB_SEEKER"}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only"
                />
                <div className="text-center w-full">
                  <div className="text-2xl mb-1">🔍</div>
                  <div className="font-medium text-sm">Job Seeker</div>
                  <div className="text-xs text-slate-500">
                    Looking for opportunities
                  </div>
                </div>
              </label>

              <label
                className={`relative flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                  role === "EMPLOYER"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="EMPLOYER"
                  checked={role === "EMPLOYER"}
                  onChange={(e) => setRole(e.target.value)}
                  className="sr-only"
                />
                <div className="text-center w-full">
                  <div className="text-2xl mb-1">💼</div>
                  <div className="font-medium text-sm">Employer</div>
                  <div className="text-xs text-slate-500">Hiring talent</div>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
