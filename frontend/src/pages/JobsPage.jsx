import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function JobsPage() {
  const { apiBase } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchJobs() {
      setLoading(true);
      setError("");
      try {
        const params = new URLSearchParams();
        if (q) params.set("q", q);
        if (location) params.set("location", location);
        const res = await fetch(`${apiBase}/jobs?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to load jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
    return () => controller.abort();
  }, [apiBase, q, location]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (q) next.q = q;
    if (location) next.location = location;
    setSearchParams(next);
  };

  return (
    <div className="grid gap-6 md:grid-cols-[280px,1fr]">
      <aside className="bg-white border rounded-xl p-4 text-sm h-fit">
        <h2 className="font-semibold text-slate-900 mb-3">Filter Jobs</h2>
        <form onSubmit={handleFilterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Keywords
            </label>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Job title, skills, company..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Job Type
            </label>
            <select
              value={searchParams.get("job_type") || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e.target.value) params.set("job_type", e.target.value);
                else params.delete("job_type");
                setSearchParams(params);
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Types</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
              <option value="CONTRACT">Contract</option>
              <option value="REMOTE">Remote</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Experience Level
            </label>
            <select
              value={searchParams.get("experience_level") || ""}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                if (e.target.value)
                  params.set("experience_level", e.target.value);
                else params.delete("experience_level");
                setSearchParams(params);
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="ENTRY">Entry Level</option>
              <option value="MID">Mid Level</option>
              <option value="SENIOR">Senior Level</option>
              <option value="EXECUTIVE">Executive</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </aside>

      <main className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            {jobs.length} Jobs Found
          </h1>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Sort by:</label>
            <select
              value={searchParams.get("sort") || "newest"}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams);
                params.set("sort", e.target.value);
                setSearchParams(params);
              }}
              className="px-3 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
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
            <div className="text-slate-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No jobs found
            </h3>
            <p className="text-slate-600 text-sm">
              Try adjusting your search criteria
            </p>
          </div>
        )}

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Link
                    to={`/jobs/${job.id}`}
                    className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    {job.title}
                  </Link>
                  <p className="text-sm text-slate-600 mt-1">
                    {job.company_name || "Company"}
                  </p>
                </div>
                <div className="text-right">
                  {job.salary_range && (
                    <p className="text-sm font-medium text-green-600">
                      {job.salary_range}
                    </p>
                  )}
                  <p className="text-xs text-slate-500">
                    {job.views || 0} views
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                {job.location && (
                  <span className="flex items-center gap-1">
                    📍 {job.location}
                  </span>
                )}
                {job.job_type && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                    {job.job_type.replace("_", " ")}
                  </span>
                )}
                {job.experience_level && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs">
                    {job.experience_level} Level
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-700 mb-4 line-clamp-2">
                {job.description}
              </p>

              {job.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.tags
                    .split(",")
                    .slice(0, 4)
                    .map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </p>
                <Link
                  to={`/jobs/${job.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
