import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function JobApplicationsPage() {
  const { jobId } = useParams();
  const { apiBase, token } = useAuth();
  const [applications, setApplications] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        // Fetch job details
        const jobRes = await fetch(`${apiBase}/jobs/${jobId}`);
        if (jobRes.ok) {
          const jobData = await jobRes.json();
          setJob(jobData.job);
        }

        // Fetch applications
        const appRes = await fetch(`${apiBase}/applications/job/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const appData = await appRes.json();
        if (!appRes.ok)
          throw new Error(appData.message || "Failed to load applications");
        setApplications(appData.applications || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [apiBase, token, jobId]);

  const updateApplicationStatus = async (applicationId, status) => {
    try {
      const res = await fetch(
        `${apiBase}/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to update status");
      }

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status } : app,
        ),
      );
    } catch (err) {
      alert("Error updating status: " + err.message);
    }
  };

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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <nav className="mb-4">
          <Link
            to="/dashboard/employer"
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to dashboard
          </Link>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {job ? `Applications for "${job.title}"` : "Job Applications"}
            </h1>
            <p className="text-slate-600 mt-1">
              {applications.length} total applications
            </p>
          </div>

          {job && (
            <Link
              to={`/jobs/${job.id}`}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              View Job Posting
            </Link>
          )}
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-white border rounded-xl overflow-hidden">
        {applications.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No applications yet
            </h3>
            <p className="text-slate-600 text-sm">
              Applications will appear here once job seekers start applying
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {applications.map((app) => (
              <div
                key={app.id}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900">
                        {app.seeker_name}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <span>📧 {app.seeker_email}</span>
                      <span>
                        📅 Applied{" "}
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {app.headline && (
                      <p className="text-sm text-slate-700 mb-2">
                        <strong>Headline:</strong> {app.headline}
                      </p>
                    )}

                    {app.skills && (
                      <div className="mb-3">
                        <p className="text-sm text-slate-700 mb-1">
                          <strong>Skills:</strong>
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {app.skills
                            .split(",")
                            .slice(0, 6)
                            .map((skill, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}

                    {app.cover_letter && (
                      <div className="mb-4">
                        <p className="text-sm text-slate-700 mb-1">
                          <strong>Cover Letter:</strong>
                        </p>
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded border">
                          {app.cover_letter}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {app.resume_path && (
                      <a
                        href={`${apiBase}/${app.resume_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                      >
                        View Resume
                      </a>
                    )}

                    <div className="flex flex-col gap-1">
                      <select
                        value={app.status}
                        onChange={(e) =>
                          updateApplicationStatus(app.id, e.target.value)
                        }
                        className="px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="APPLIED">Applied</option>
                        <option value="REVIEWING">Reviewing</option>
                        <option value="ACCEPTED">Accepted</option>
                        <option value="REJECTED">Rejected</option>
                      </select>
                    </div>
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
