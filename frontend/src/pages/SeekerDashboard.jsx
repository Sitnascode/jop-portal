import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function SeekerDashboard() {
  const { apiBase, token, user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${apiBase}/applications/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok)
          throw new Error(data.message || "Failed to load applications");
        setApplications(data.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchApplications();
  }, [apiBase, token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      case "REVIEWING":
        return "bg-yellow-100 text-yellow-700";
      case "ACCEPTED":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.name || "job seeker"}
          </h1>
          <p className="text-slate-600 mt-1">
            Track your applications and discover new opportunities
          </p>
        </div>
        <Link
          to="/jobs"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Browse Jobs
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Applications</p>
              <p className="text-2xl font-bold text-slate-900">
                {applications.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              📄
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Under Review</p>
              <p className="text-2xl font-bold text-slate-900">
                {statusCounts.REVIEWING || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              👀
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Accepted</p>
              <p className="text-2xl font-bold text-slate-900">
                {statusCounts.ACCEPTED || 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Response Rate</p>
              <p className="text-2xl font-bold text-slate-900">
                {applications.length > 0
                  ? Math.round(
                      (((statusCounts.ACCEPTED || 0) +
                        (statusCounts.REJECTED || 0)) /
                        applications.length) *
                        100,
                    )
                  : 0}
                %
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            My Applications
          </h2>
          {applications.length > 0 && (
            <p className="text-sm text-slate-600">
              {applications.length} total applications
            </p>
          )}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        {!loading && applications.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No applications yet
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Start applying to jobs that match your skills and interests
            </p>
            <Link
              to="/jobs"
              className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Browse Available Jobs
            </Link>
          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Link
                        to={`/jobs/${app.job_id}`}
                        className="font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        {app.title}
                      </Link>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      {app.company_name && <span>🏢 {app.company_name}</span>}
                      {app.location && <span>📍 {app.location}</span>}
                      <span>
                        Applied {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {app.cover_letter && (
                      <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                        Cover letter: "{app.cover_letter.substring(0, 100)}..."
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/jobs/${app.job_id}`}
                      className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors"
                    >
                      View Job
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Recommendations */}
      {applications.length > 0 && (
        <div className="bg-white border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Recommended for You
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Based on your application history, here are some similar
            opportunities:
          </p>
          <Link
            to="/jobs"
            className="inline-flex px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
          >
            View Similar Jobs →
          </Link>
        </div>
      )}
    </div>
  );
}
