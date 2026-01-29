export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-600">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-slate max-w-none">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-3">
            Your Privacy Matters
          </h2>
          <p className="text-slate-700">
            At JobPortal, we are committed to protecting your privacy and
            ensuring the security of your personal information. This policy
            explains how we collect, use, and safeguard your data.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              1. Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Personal Information
                </h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>Name, email address, and contact information</li>
                  <li>Professional experience and education details</li>
                  <li>Resume and portfolio materials</li>
                  <li>Job preferences and search criteria</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Usage Information
                </h3>
                <ul className="list-disc list-inside text-slate-700 space-y-1">
                  <li>How you interact with our platform</li>
                  <li>Job searches and application history</li>
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>To provide and improve our job matching services</li>
              <li>To connect you with relevant job opportunities</li>
              <li>To communicate about your applications and account</li>
              <li>To personalize your experience on our platform</li>
              <li>To ensure platform security and prevent fraud</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              3. Information Sharing
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-slate-700">
                <strong>We never sell your personal information.</strong> We
                only share your data in the following circumstances:
              </p>
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>With employers when you apply to their job postings</li>
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>
                With trusted service providers who help operate our platform
              </li>
              <li>In case of business transfers or mergers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-slate-700 mb-4">
              We implement industry-standard security measures to protect your
              information:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and monitoring</li>
              <li>Access controls and authentication measures</li>
              <li>Secure data centers and infrastructure</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              5. Your Rights and Choices
            </h2>
            <p className="text-slate-700 mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Access and review your personal data</li>
              <li>Update or correct inaccurate information</li>
              <li>Delete your account and associated data</li>
              <li>Control email and notification preferences</li>
              <li>Opt out of certain data processing activities</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-slate-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Remember your preferences and settings</li>
              <li>Analyze platform usage and performance</li>
              <li>Provide personalized content and recommendations</li>
              <li>Ensure platform security</li>
            </ul>
            <p className="text-slate-700 mt-4">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              7. Data Retention
            </h2>
            <p className="text-slate-700">
              We retain your personal information for as long as necessary to
              provide our services and comply with legal obligations. When you
              delete your account, we will remove your personal data within 30
              days, except where required by law to retain certain information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-slate-700">
              Our platform is not intended for users under 16 years of age. We
              do not knowingly collect personal information from children under
              16. If we become aware of such collection, we will take steps to
              delete the information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-slate-700">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your data in accordance with applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-slate-700">
              We may update this privacy policy from time to time. We will
              notify you of any material changes by email or through our
              platform. Your continued use of our services after such changes
              constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              11. Contact Us
            </h2>
            <p className="text-slate-700 mb-4">
              If you have questions about this privacy policy or our data
              practices, please contact us:
            </p>
            <div className="bg-slate-50 border rounded-lg p-4">
              <ul className="text-slate-700 space-y-1">
                <li>
                  <strong>Email:</strong> privacy@jobportal.com
                </li>
                <li>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </li>
                <li>
                  <strong>Address:</strong> 123 Business Ave, Suite 100, New
                  York, NY 10001
                </li>
              </ul>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Questions about your privacy?
          </h3>
          <p className="text-slate-700 mb-4">
            We're here to help. Contact our privacy team or visit our Help
            Center for more information about how we protect your data.
          </p>
          <div className="flex gap-4">
            <a
              href="/contact"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="/help"
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
