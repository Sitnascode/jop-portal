import { Link } from "react-router-dom";

export default function HelpCenterPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Help Center</h1>
        <p className="text-lg text-slate-600">
          Find answers to common questions and get the help you need
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-4 top-3.5 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* FAQ Categories */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border rounded-xl p-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            For Job Seekers
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                How to create a profile
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Searching for jobs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Applying to positions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Tracking applications
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Resume tips
              </a>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-3">
            For Employers
          </h3>
          <ul className="space-y-2 text-slate-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Posting job listings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Managing applications
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Reviewing candidates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Pricing and billing
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Best practices
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Popular Articles */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Popular Articles
        </h2>
        <div className="space-y-4">
          <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-slate-900 mb-2">
              How to write an effective cover letter
            </h3>
            <p className="text-slate-600 text-sm">
              Learn the key elements of a compelling cover letter that gets
              noticed by employers.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-slate-900 mb-2">
              Setting up job alerts and notifications
            </h3>
            <p className="text-slate-600 text-sm">
              Never miss an opportunity with our customizable job alert system.
            </p>
          </div>
          <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-slate-900 mb-2">
              Understanding application status updates
            </h3>
            <p className="text-slate-600 text-sm">
              Track your application progress and understand what each status
              means.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Support */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <h3 className="text-xl font-semibold text-slate-900 mb-3">
          Still need help?
        </h3>
        <p className="text-slate-600 mb-4">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        <Link
          to="/contact"
          className="inline-flex px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
