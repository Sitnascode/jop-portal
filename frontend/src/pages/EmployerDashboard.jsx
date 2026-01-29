import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function EmployerDashboard() {
  const { apiBase, token, user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${apiBase}/jobs/employer/mine/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.message || "Failed to load jobs");
        setJobs(data.jobs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [apiBase, token]);

  const totalViews = jobs.reduce((sum, j) => sum + (j.views || 0), 0);
  const totalApplications = jobs.reduce(
    (sum, j) => sum + (j.applications || 0),
    0,
  );
  const activeJobs = jobs.filter((j) => j.status !== "CLOSED").length;

  return (
    <div className="space-y-6">
      {/* Header with CTA */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back, {user?.name || "employer"}
          </h1>
          <p className="text-slate-600 mt-1">
            Manage your job postings and track applicants
          </p>
        </div>
        <Link
          to="/post-job"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          + Post New Job
        </Link>
      </div>

      {/* Analytics Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Active Jobs</p>
              <p className="text-2xl font-bold text-slate-900">{activeJobs}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              💼
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">{totalViews}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              👁️
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Applications</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalApplications}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              📄
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Avg. Views/Job</p>
              <p className="text-2xl font-bold text-slate-900">
                {jobs.length > 0 ? Math.round(totalViews / jobs.length) : 0}
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            My Job Postings
          </h2>
          {jobs.length > 0 && (
            <p className="text-sm text-slate-600">{jobs.length} total jobs</p>
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

        {!loading && jobs.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">💼</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No job postings yet
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Start by posting your first job to attract top talent
            </p>
            <Link
              to="/post-job"
              className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Post Your First Job
            </Link>
          </div>
        )}

        {!loading && jobs.length > 0 && (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {job.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {job.status || "Active"}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      {job.location && <span>📍 {job.location}</span>}
                      {job.job_type && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                          {job.job_type.replace("_", " ")}
                        </span>
                      )}
                      <span>
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <span className="text-slate-600">
                        👁️ {job.views || 0} views
                      </span>
                      <span className="text-slate-600">
                        📄 {job.applications || 0} applications
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/jobs/${job.id}/applications`}
                      className="px-3 py-2 text-sm border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors"
                    >
                      View Applications
                    </Link>
                    <Link
                      to={`/jobs/${job.id}/edit`}
                      className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
