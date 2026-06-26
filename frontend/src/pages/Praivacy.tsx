const Privacy = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: June 26, 2026</p>

        {/* ===== 1. INTRODUCTION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            At CodeNexusLabs, we are committed to protecting your privacy and ensuring a safe, trustworthy learning environment. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our platform, website, and related services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using CodeNexusLabs, you agree to the practices described in this policy.
          </p>
        </section>

        {/* ===== 2. INFORMATION WE COLLECT ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect information to provide better services to all our users.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.1 Account Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Username</li>
            <li>Password (hashed and encrypted)</li>
            <li>Account creation date</li>
            <li>Account status</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.2 Profile Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Bio/About section</li>
            <li>Skills and technologies</li>
            <li>Education background</li>
            <li>Work experience</li>
            <li>Profile picture</li>
            <li>Social media links (optional)</li>
            <li>Location (optional)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.3 Learning Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Enrolled courses</li>
            <li>Course progress percentage</li>
            <li>Completed lessons and modules</li>
            <li>Quiz scores and answers</li>
            <li>Code submissions and solutions</li>
            <li>Project work and assignments</li>
            <li>Time spent on each course</li>
            <li>Course completion dates</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.4 Usage Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Pages viewed</li>
            <li>Features used</li>
            <li>Search queries</li>
            <li>Time spent on platform</li>
            <li>Click patterns</li>
            <li>Navigation paths</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.5 Technical Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Device type</li>
            <li>Screen resolution</li>
            <li>Language preference</li>
            <li>Time zone</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.6 Cookies and Tracking</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Session cookies (for authentication)</li>
            <li>Preference cookies (for user settings)</li>
            <li>Analytics cookies (for platform improvement)</li>
            <li>Marketing cookies (for recommendations, with consent)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.7 Resume Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Uploaded resume files</li>
            <li>Work history</li>
            <li>Education details</li>
            <li>Skills and certifications</li>
            <li>Projects and achievements</li>
            <li>Contact information</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">2.8 Communication Data</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Support tickets and queries</li>
            <li>Feedback and surveys</li>
            <li>Newsletter subscription status</li>
            <li>Email interactions</li>
          </ul>

          {/* ===== 2.9 PAYMENT DATA - REMOVED (Will add when paid features launch) ===== */}
        </section>

        {/* ===== 3. HOW WE COLLECT ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Collect Information</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Direct Collection</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We collect information you provide directly when:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Creating an account</li>
            <li>Updating your profile</li>
            <li>Enrolling in courses</li>
            <li>Submitting quizzes and assignments</li>
            <li>Uploading resumes</li>
            <li>Contacting support</li>
            <li>Subscribing to newsletters</li>
            <li>Participating in surveys</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Automatic Collection</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We automatically collect information when you:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Visit our website</li>
            <li>Navigate through pages</li>
            <li>Use platform features</li>
            <li>Interact with content</li>
            <li>Submit forms</li>
            <li>Click links</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Third-Party Collection</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We receive information from:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Google/GitHub OAuth (if you sign in via these services)</li>
            <li>Google Analytics (usage data)</li>
            <li>Payment processors (for future paid features)</li>
            <li>Email service providers (SendGrid)</li>
          </ul>
        </section>

        {/* ===== 4. HOW WE USE ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use your information for the following lawful purposes:</p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Providing Educational Services</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To deliver courses and learning materials</li>
            <li>To track your progress and completion</li>
            <li>To personalize your learning experience</li>
            <li>To recommend relevant courses</li>
            <li>To issue certificates and badges</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Platform Improvement</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To analyze usage patterns</li>
            <li>To identify and fix bugs</li>
            <li>To enhance features and content</li>
            <li>To improve user experience</li>
            <li>To develop new features</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Communication</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To send course updates and announcements</li>
            <li>To share recommendations</li>
            <li>To respond to support requests</li>
            <li>To send important platform notifications</li>
            <li>To send newsletters (with consent)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.4 Security & Compliance</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To protect against unauthorized access</li>
            <li>To prevent fraud and abuse</li>
            <li>To maintain platform safety</li>
            <li>To comply with legal obligations</li>
            <li>To enforce our Terms of Service</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.5 Career Services</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To help you build professional resumes</li>
            <li>To prepare you for interviews</li>
            <li>To connect you with job opportunities</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.6 Marketing (with Consent)</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>To send promotional emails</li>
            <li>To share course recommendations</li>
            <li>To invite you to events or webinars</li>
          </ul>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <p className="text-sm font-semibold text-gray-800">Lawful Basis for Processing:</p>
            <p className="text-sm text-gray-700 mt-1">
              Under India's DPDP Act and other applicable laws, we process your data based on:
            </p>
            <ul className="list-disc pl-6 mt-1 text-sm text-gray-700 space-y-1">
              <li><span className="font-medium">Consent:</span> When you create an account and agree to this policy</li>
              <li><span className="font-medium">Contract:</span> To provide the services you have requested</li>
              <li><span className="font-medium">Legal Obligation:</span> To comply with applicable laws</li>
              <li><span className="font-medium">Legitimate Interest:</span> To improve our platform and ensure security</li>
            </ul>
          </div>
        </section>

        {/* ===== 5. HOW WE SHARE ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. How We Share Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <span className="font-semibold">We never sell your personal information.</span> We may share data with trusted service providers who help us operate our platform:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Service Providers</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Supabase:</span> Database hosting and authentication</li>
            <li><span className="font-medium">Railway:</span> Application hosting and deployment</li>
            <li><span className="font-medium">Vercel:</span> Frontend hosting and content delivery</li>
            <li><span className="font-medium">SendGrid:</span> Email communications and notifications</li>
            <li><span className="font-medium">Google Analytics:</span> Platform analytics (anonymous)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 Data Protection Agreements</h3>
          <p className="text-gray-700 leading-relaxed mb-2">All our service providers are contractually bound to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Process your data only for the purposes we specify</li>
            <li>Maintain confidentiality and security of your data</li>
            <li>Comply with applicable data protection laws</li>
            <li>Assist with user rights requests</li>
            <li>Report data breaches promptly</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Legal Disclosure</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We may disclose your data if required by law or in good faith belief that such action is necessary to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Comply with legal obligations</li>
            <li>Protect rights and safety of users</li>
            <li>Prevent fraud or security issues</li>
            <li>Respond to lawful requests from public authorities</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.4 Business Transfers</h3>
          <p className="text-gray-700 leading-relaxed">
            If CodeNexusLabs is involved in a merger, acquisition, or asset sale, your data may be transferred. We will notify you before your data is transferred and becomes subject to a different privacy policy.
          </p>
        </section>

        {/* ===== 6. CHILDREN'S PRIVACY ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Children's Privacy</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Age Restrictions</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            CodeNexusLabs is not directed at children under 13. We do not knowingly collect personal information from children under 13 without verifiable parental consent.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            Under India's DPDP Act, individuals under 18 are considered children and require parental consent.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Parental Consent Requirements</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Under 13 (COPPA): Verifiable parental consent required</li>
            <li>Under 16 (GDPR): Parental consent required</li>
            <li>Under 18 (DPDP India): Parental consent required</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.3 Prohibited Activities for Children</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We do not engage in:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Tracking or behavioral monitoring of children</li>
            <li>Targeted advertising directed at children</li>
            <li>Processing children's data for purposes that could cause detrimental effect</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.4 Parental Rights</h3>
          <p className="text-gray-700 leading-relaxed">
            If you believe we have collected data from a child without proper consent, please contact us at <span className="text-indigo-600 font-medium">privacy@codenexuslabs.com</span> immediately.
          </p>
        </section>

        {/* ===== 7. YOUR RIGHTS ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Under India's DPDP Act and international privacy laws, you have the following rights:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Right to Access:</span> Request a copy of your personal data we hold</li>
            <li><span className="font-medium">Right to Correction:</span> Update or correct inaccurate information</li>
            <li><span className="font-medium">Right to Deletion:</span> Request account and data deletion</li>
            <li><span className="font-medium">Right to Withdraw Consent:</span> Withdraw consent at any time (as easy as giving it)</li>
            <li><span className="font-medium">Right to Object:</span> Object to processing for marketing purposes</li>
            <li><span className="font-medium">Right to Portability:</span> Receive data in a machine-readable format</li>
            <li><span className="font-medium">Right to Grievance:</span> File a complaint with our Grievance Officer</li>
            <li><span className="font-medium">Right to Restriction:</span> Restrict processing in certain circumstances</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Exercise Your Rights</h3>
          <p className="text-gray-700 leading-relaxed">
            To exercise any of these rights, contact our Grievance Officer at <span className="text-indigo-600 font-medium">grievance@codenexuslabs.com</span>. We respond to all requests within 30-45 days as required by law.
          </p>
        </section>

        {/* ===== 8. DATA RETENTION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Data Retention & Security</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">8.1 Retention Periods</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Account Data:</span> Until you delete your account</li>
            <li><span className="font-medium">Learning History:</span> Indefinitely (for progress tracking)</li>
            <li><span className="font-medium">Support Tickets:</span> 3 years after resolution</li>
            <li><span className="font-medium">Usage Analytics:</span> 2 years (aggregated, anonymized)</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">8.2 Security Measures</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Encryption (TLS/SSL for data in transit, hashed passwords)</li>
            <li>Access Control (Restricted admin access to personal data)</li>
            <li>Regular security audits and vulnerability scans</li>
            <li>Regular encrypted backups to prevent data loss</li>
          </ul>
        </section>

        {/* ===== 9. CROSS-BORDER DATA TRANSFERS ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Cross-Border Data Transfers</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your data may be transferred to servers located in the United States and India through our service providers (Railway, Vercel, Supabase, SendGrid). We ensure appropriate safeguards are in place for international data transfers in compliance with applicable laws.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">Transfer Safeguards</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Standard Contractual Clauses (SCCs) with all service providers</li>
            <li>Data Protection Agreements that include DPDP-compliant clauses</li>
            <li>Transfer Impact Assessments where required</li>
          </ul>
        </section>

        {/* ===== 10. COOKIES ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">We use cookies and similar technologies to enhance your experience:</p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">10.1 Types of Cookies</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Essential:</span> Authentication, session management, security</li>
            <li><span className="font-medium">Preference:</span> Language, theme preferences</li>
            <li><span className="font-medium">Analytics:</span> Anonymous usage tracking (Google Analytics)</li>
            <li><span className="font-medium">Marketing:</span> Course recommendations (optional, with consent)</li>
          </ul>

          <p className="text-gray-700 leading-relaxed">
            You can manage cookie preferences in your browser settings. For more information, see our Cookie Policy.
          </p>
        </section>

        {/* ===== 11. GRIEVANCE REDRESSAL ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Grievance Redressal</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Under India's DPDP Act, we have appointed a Grievance Officer to handle your privacy concerns:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Name:</span> Grievance Officer</li>
            <li><span className="font-medium">Email:</span> grievance@codenexuslabs.com</li>
            <li><span className="font-medium">Response Time:</span> 48 hours acknowledgment, 30-45 days resolution</li>
          </ul>
          {/* ===== ESCALATION LINE REMOVED - Will add when needed ===== */}
        </section>

        {/* ===== 12. UPDATES ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">12. Updates to This Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes via:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Email notification to registered users</li>
            <li>In-platform notification on your dashboard</li>
            <li>Notice on our website</li>
          </ul>
          <p className="text-sm text-gray-500 mt-2">Last Updated: June 26, 2026</p>
        </section>

        {/* ===== 13. CONTACT ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">13. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions, concerns, or requests regarding this Privacy Policy:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Privacy Requests:</span> privacy@codenexuslabs.com</li>
            <li><span className="font-medium">Grievance Officer:</span> grievance@codenexuslabs.com</li>
            <li><span className="font-medium">General Support:</span> support@codenexuslabs.com</li>
            <li><span className="font-medium">Address:</span> Hyderabad, Telangana, India</li>
          </ul>
        </section>

        {/* Bottom Note */}
        <div className="border-t border-gray-200 pt-6 mt-8 text-center">
          <p className="text-sm text-gray-500">CodeNexusLabs — Learn. Build. Ship.</p>
          <p className="text-xs text-gray-400 mt-1">By using our platform, you agree to this Privacy Policy.</p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;