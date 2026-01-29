import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function JobDetailPage() {
  const { id } = useParams();
  const { apiBase, user, token } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applySuccess, setApplySuccess] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchJob() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${apiBase}/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to load job");
        const data = await res.json();
        setJob(data.job);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchJob();
  }, [apiBase, id]);

  const canApply = user && user.role === "JOB_SEEKER";

  const handleApply = async (e) => {
    e.preventDefault();
    if (!canApply) return;
    setApplying(true);
    setApplyError("");
    setApplySuccess("");
    try {
      const res = await fetch(`${apiBase}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ job_id: Number(id), cover_letter: coverLetter }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Failed to apply");
      setApplySuccess("Application submitted successfully.");
      setCoverLetter("");
    } catch (err) {
      setApplyError(err.message);
    } finally {
      setApplying(false);
    }
  };

  const handleSaveJob = () => {
    setSaved(!saved);
    // TODO: Implement save job API call
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Job not found
        </h2>
        <Link to="/jobs" className="text-blue-600 hover:text-blue-700">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link to="/jobs" className="text-blue-600 hover:text-blue-700 text-sm">
          ← Back to jobs
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Job Header */}
          <div className="bg-white border rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex items-center gap-4 text-slate-600 mb-3">
                  {job.company_name && (
                    <span className="flex items-center gap-1">
                      🏢 {job.company_name}
                    </span>
                  )}
                  {job.location && (
                    <span className="flex items-center gap-1">
                      📍 {job.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    👁️ {job.views || 0} views
                  </span>
                </div>
              </div>

              {canApply && (
                <button
                  onClick={handleSaveJob}
                  className={`p-2 rounded-lg border transition-colors ${
                    saved
                      ? "bg-blue-50 border-blue-200 text-blue-600"
                      : "border-slate-300 text-slate-600 hover:bg-slate-50"
                  }`}
                  title={saved ? "Saved" : "Save job"}
                >
                  {saved ? "❤️" : "🤍"}
                </button>
              )}
            </div>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-3 mb-4">
              {job.job_type && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {job.job_type.replace("_", " ")}
                </span>
              )}
              {job.experience_level && (
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {job.experience_level} Level
                </span>
              )}
              {job.salary_range && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {job.salary_range}
                </span>
              )}
            </div>

            {/* Tags */}
            {job.tags && (
              <div className="flex flex-wrap gap-2">
                {job.tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </div>

          {/* Job Description */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Job Description
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Company Info (if available) */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              About the Company
            </h2>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                🏢
              </div>
              <div>
                <h3 className="font-medium text-slate-900">
                  {job.company_name || "Company Name"}
                </h3>
                <p className="text-sm text-slate-600">
                  Hiring for this position
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Learn more about this company and their other job openings.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Card */}
          <div className="bg-white border rounded-xl p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Apply for this role
            </h2>

            {!user && (
              <div className="text-center py-4">
                <p className="text-slate-600 mb-4">
                  Please login to apply for this job
                </p>
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors text-center"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            )}

            {user && user.role !== "JOB_SEEKER" && (
              <div className="text-center py-4">
                <p className="text-slate-600">
                  Only job seekers can apply to jobs
                </p>
              </div>
            )}

            {canApply && (
              <form onSubmit={handleApply} className="space-y-4">
                {applyError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {applyError}
                  </div>
                )}

                {applySuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    {applySuccess}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tell the employer why you're a great fit for this role..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={applying}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {applying
                    ? "Submitting Application..."
                    : "Submit Application"}
                </button>
              </form>
            )}
          </div>

          {/* Job Details */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-3">Job Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Posted</span>
                <span className="text-slate-900">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
              {job.job_type && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Job Type</span>
                  <span className="text-slate-900">
                    {job.job_type.replace("_", " ")}
                  </span>
                </div>
              )}
              {job.experience_level && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Experience</span>
                  <span className="text-slate-900">
                    {job.experience_level} Level
                  </span>
                </div>
              )}
              {job.salary_range && (
                <div className="flex justify-between">
                  <span className="text-slate-600">Salary</span>
                  <span className="text-slate-900">{job.salary_range}</span>
                </div>
              )}
            </div>
          </div>

          {/* Application Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-3">
              💡 Application Tips
            </h3>
            <ul className="text-sm text-slate-700 space-y-2">
              <li>• Tailor your cover letter to this specific role</li>
              <li>• Highlight relevant skills and experience</li>
              <li>• Keep it concise and professional</li>
              <li>• Proofread before submitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
