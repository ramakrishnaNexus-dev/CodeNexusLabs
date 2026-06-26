const Terms = () => {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: June 26, 2026</p>

        {/* ===== 1. INTRODUCTION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Welcome to CodeNexusLabs. By using our platform, website, and related services, you agree to comply with and be bound by these Terms of Service. Please read them carefully before using our services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            These Terms govern your use of CodeNexusLabs and constitute a legally binding agreement between you and CodeNexusLabs.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By creating an account or using our platform, you signify that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
            <p className="text-sm font-semibold text-gray-800">Definitions:</p>
            <ul className="list-disc pl-6 mt-1 text-sm text-gray-700 space-y-1">
              <li><span className="font-medium">"CodeNexusLabs", "we", "us", "our":</span> Refers to CodeNexusLabs and its operators.</li>
              <li><span className="font-medium">"You", "your", "user":</span> Refers to the individual using our platform.</li>
              <li><span className="font-medium">"Platform", "Service":</span> Refers to the CodeNexusLabs website, courses, and related tools.</li>
              <li><span className="font-medium">"Content":</span> Refers to all materials, including courses, tutorials, code examples, and user submissions.</li>
            </ul>
          </div>
        </section>

        {/* ===== 2. USER ELIGIBILITY ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. User Eligibility</h2>
          <p className="text-gray-700 leading-relaxed mb-3">By using CodeNexusLabs, you represent and warrant that:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>You are at least 13 years of age.</li>
            <li>If you are under 18 years of age, you have obtained parental or legal guardian consent to use our platform.</li>
            <li>You have the legal capacity to enter into a binding agreement.</li>
            <li>You are not located in a country that is subject to a U.S. government embargo.</li>
            <li>You are not prohibited from using our services under applicable laws.</li>
          </ul>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-800">Parental Consent:</p>
            <p className="text-sm text-gray-700 mt-1">
              If you are under 18, your parent or legal guardian must review and agree to these Terms on your behalf. We may request verification of parental consent at any time.
            </p>
          </div>
        </section>

        {/* ===== 3. ACCOUNT CREATION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account Creation and Responsibilities</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.1 Account Registration</h3>
          <p className="text-gray-700 leading-relaxed mb-2">To access certain features, you must create an account. You agree to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Provide accurate, current, and complete information during registration.</li>
            <li>Update your information to keep it accurate and current.</li>
            <li>Use a valid email address that you regularly access.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.2 Account Security</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You are responsible for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Maintaining the confidentiality of your password and account credentials.</li>
            <li>All activities that occur under your account.</li>
            <li>Notifying us immediately of any unauthorized use of your account.</li>
            <li>Not sharing your account credentials with anyone.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">3.3 Account Termination</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We reserve the right to suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>You violate these Terms.</li>
            <li>You provide false or misleading information.</li>
            <li>Your account is used for fraudulent or illegal activities.</li>
            <li>We are required to do so by law.</li>
          </ul>
        </section>

        {/* ===== 4. ACCEPTABLE USE ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use and User Conduct</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.1 Permitted Use</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You may use CodeNexusLabs for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Personal, non-commercial educational purposes.</li>
            <li>Learning programming and software development skills.</li>
            <li>Preparing for interviews and career advancement.</li>
            <li>Building projects and practicing coding.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.2 Prohibited Conduct</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You agree NOT to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Use the platform for any unlawful purpose or in violation of any applicable law.</li>
            <li>Share, sell, or transfer your account to any third party.</li>
            <li>Attempt to gain unauthorized access to any part of our platform.</li>
            <li>Use our platform to distribute spam, viruses, or malicious code.</li>
            <li>Engage in scraping, data mining, or automated data extraction.</li>
            <li>Plagiarize or copy content from our platform for redistribution.</li>
            <li>Submit fraudulent or misleading information.</li>
            <li>Harass, abuse, or harm other users.</li>
            <li>Use our platform to store or share illegal content.</li>
            <li>Reverse engineer or decompile any part of our platform.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">4.3 Academic Integrity</h3>
          <p className="text-gray-700 leading-relaxed mb-2">CodeNexusLabs is a learning platform. We expect users to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Complete quizzes and assignments honestly.</li>
            <li>Not share answers or solutions to assessments.</li>
            <li>Use code examples and solutions for learning purposes only.</li>
            <li>Respect the intellectual property of others.</li>
          </ul>
        </section>

        {/* ===== 5. INTELLECTUAL PROPERTY ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Intellectual Property</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.1 Platform Content</h3>
          <p className="text-gray-700 leading-relaxed mb-2">All content on CodeNexusLabs, including but not limited to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Course materials, tutorials, and videos</li>
            <li>Code examples and solutions</li>
            <li>Quizzes and assessments</li>
            <li>Graphics, logos, and brand elements</li>
            <li>Platform design and user interface</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            ...is the property of CodeNexusLabs and is protected by copyright, trademark, and other intellectual property laws.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.2 User Content</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You retain ownership of content you submit, including:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Code you write</li>
            <li>Projects you create</li>
            <li>Comments and feedback</li>
            <li>Profile information</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-2">By submitting content, you grant CodeNexusLabs a non-exclusive, worldwide, royalty-free license to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Store, display, and reproduce your content on our platform.</li>
            <li>Use your content to improve our services.</li>
            <li>Share your content with other users (for public submissions).</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">5.3 Restrictions</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You may not:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Reproduce, distribute, or create derivative works from our content.</li>
            <li>Use our content for commercial purposes without permission.</li>
            <li>Remove or alter any copyright or trademark notices.</li>
          </ul>
        </section>

        {/* ===== 6. COURSES ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Courses and Learning Materials</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.1 Course Access</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Courses are available to registered users.</li>
            <li>Access may be subject to completion of prerequisites.</li>
            <li>We reserve the right to update, modify, or remove courses at any time.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.2 Progress Tracking</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Your progress is tracked through your account.</li>
            <li>Progress data is stored for your benefit.</li>
            <li>We may use progress data to improve our services.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">6.3 Certificates</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Certificates may be issued upon course completion.</li>
            <li>Certificates indicate completion of learning materials.</li>
            <li>We do not guarantee that certificates will be recognized by employers or institutions.</li>
            <li>Certificates are for personal educational purposes only.</li>
          </ul>
        </section>

        {/* ===== 7. USER-GENERATED CONTENT ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. User-Generated Content</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">7.1 Public Content</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Content you make public may be:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Viewed by other users.</li>
            <li>Shared on our platform.</li>
            <li>Used for educational purposes.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">7.2 Private Content</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Your private submissions, including code and projects, are:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Stored securely on our platform.</li>
            <li>Accessible only to you and authorized personnel.</li>
            <li>Protected in accordance with our Privacy Policy.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">7.3 Content Removal</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We reserve the right to remove any user-generated content that violates these Terms, including:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Offensive or inappropriate content.</li>
            <li>Copyrighted or plagiarized material.</li>
            <li>Content that violates any law.</li>
          </ul>
        </section>

        {/* ===== 8. THIRD-PARTY SERVICES ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Third-Party Services</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">8.1 Service Providers</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We use trusted third-party services to operate our platform:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">Supabase:</span> Database hosting and authentication</li>
            <li><span className="font-medium">Railway:</span> Application hosting and deployment</li>
            <li><span className="font-medium">Vercel:</span> Frontend hosting and content delivery</li>
            <li><span className="font-medium">SendGrid:</span> Email communications</li>
            <li><span className="font-medium">Google Analytics:</span> Platform analytics</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">8.2 Third-Party Links</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Our platform may contain links to third-party websites. We are not responsible for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>The content or privacy practices of these sites.</li>
            <li>Any damage or loss caused by using these sites.</li>
            <li>The accuracy or reliability of third-party information.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">8.3 Third-Party Agreements</h3>
          <p className="text-gray-700 leading-relaxed">
            Your use of third-party services may be subject to their terms of service and privacy policies. We encourage you to review these policies.
          </p>
        </section>

        {/* ===== 9. PRIVACY ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Privacy and Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Your privacy is important to us. Our Privacy Policy, available at /privacy, explains:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>How we collect and use your information.</li>
            <li>How we protect your data.</li>
            <li>Your rights regarding your personal information.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            By using CodeNexusLabs, you consent to our data practices as described in the Privacy Policy.
          </p>
        </section>

        {/* ===== 10. EDUCATIONAL DISCLAIMER ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Educational Disclaimer</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">10.1 No Warranty</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Our platform is provided "as is" and "as available" without warranties of any kind:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>We do not guarantee that our courses will lead to employment.</li>
            <li>We do not guarantee that you will achieve specific learning outcomes.</li>
            <li>We do not guarantee uninterrupted, error-free, or secure access.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">10.2 Informational Purpose Only</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Content on CodeNexusLabs is for educational purposes only:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Not professional advice.</li>
            <li>Not a substitute for formal education.</li>
            <li>Not guaranteed to be accurate or complete.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">10.3 No Endorsement</h3>
          <p className="text-gray-700 leading-relaxed">
            We do not endorse any third-party products, services, or opinions mentioned on our platform.
          </p>
        </section>

        {/* ===== 11. LIMITATION OF LIABILITY ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            To the maximum extent permitted by law:
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">11.1 No Liability</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We are not liable for:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Any indirect, incidental, or consequential damages.</li>
            <li>Any loss of data, profits, or opportunities.</li>
            <li>Any damages arising from your use of our platform.</li>
            <li>Any damages arising from third-party services.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">11.2 Cap on Liability</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Our total liability to you shall not exceed:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>The amount you have paid to us (if any).</li>
            <li>$100 (or equivalent) if you have not paid us.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">11.3 Exceptions</h3>
          <p className="text-gray-700 leading-relaxed mb-2">This limitation does not apply to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Liability that cannot be excluded under applicable law.</li>
            <li>Damages arising from our gross negligence or willful misconduct.</li>
            <li>Liability for death or personal injury.</li>
          </ul>
        </section>

        {/* ===== 12. INDEMNIFICATION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">12. Indemnification</h2>
          <p className="text-gray-700 leading-relaxed">
            You agree to defend, indemnify, and hold CodeNexusLabs harmless from any claims, damages, or expenses arising from:
          </p>
          <ul className="list-disc pl-6 mt-3 text-gray-700 space-y-1">
            <li>Your use of our platform.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any law or third-party rights.</li>
            <li>Your content submissions.</li>
          </ul>
        </section>

        {/* ===== 13. SUSPENSION AND TERMINATION ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">13. Suspension and Termination</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">13.1 Termination by You</h3>
          <p className="text-gray-700 leading-relaxed mb-2">You may terminate your account at any time by:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Deleting your account through your profile settings.</li>
            <li>Contacting us to request account deletion.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">13.2 Termination by Us</h3>
          <p className="text-gray-700 leading-relaxed mb-2">We may suspend or terminate your account if:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>You violate these Terms.</li>
            <li>You engage in fraudulent or illegal activity.</li>
            <li>You create risk or legal exposure for us.</li>
            <li>We are required to do so by law.</li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">13.3 Effect of Termination</h3>
          <p className="text-gray-700 leading-relaxed mb-2">Upon termination:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Your access to the platform will be removed.</li>
            <li>Your data may be retained as required by law.</li>
            <li>Any agreements or licenses you have granted remain in effect.</li>
          </ul>
        </section>

        {/* ===== 14. GOVERNING LAW ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">14. Governing Law and Dispute Resolution</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">14.1 Governing Law</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms are governed by and construed in accordance with the laws of India.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">14.2 Jurisdiction</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">14.3 Dispute Resolution</h3>
          <p className="text-gray-700 leading-relaxed mb-2">If you have a dispute with us, you agree to:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>First contact us to resolve the dispute informally.</li>
            <li>If not resolved, attempt mediation or arbitration.</li>
            <li>Agree to individual dispute resolution (not class actions).</li>
          </ul>
        </section>

        {/* ===== 15. CHANGES TO TERMS ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">15. Changes to These Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            We may update these Terms from time to time to reflect:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Changes in our practices.</li>
            <li>Changes in legal requirements.</li>
            <li>New features or services.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-3">We will notify you of significant changes:</p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li>Via email notification.</li>
            <li>Via in-platform notification.</li>
            <li>By posting the updated Terms on our website.</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Your continued use of CodeNexusLabs after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        {/* ===== 16. MISCELLANEOUS ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">16. Miscellaneous</h2>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.1 Entire Agreement</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            These Terms constitute the entire agreement between you and CodeNexusLabs.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.2 Severability</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            If any provision of these Terms is found to be invalid, the remaining provisions remain in effect.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.3 Waiver</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            Our failure to enforce any right or provision does not waive that right.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.4 Assignment</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            You may not assign these Terms without our consent. We may assign these Terms without restriction.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.5 Force Majeure</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            We are not liable for any failure to perform due to circumstances beyond our reasonable control.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">16.6 No Agency</h3>
          <p className="text-gray-700 leading-relaxed">
            No agency, partnership, joint venture, or employment relationship is created by these Terms.
          </p>
        </section>

        {/* ===== 17. CONTACT ===== */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">17. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have questions, concerns, or requests regarding these Terms:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
            <li><span className="font-medium">General Support:</span> support@codenexuslabs.com</li>
            <li><span className="font-medium">Legal/Compliance:</span> grievance@codenexuslabs.com</li>
            <li><span className="font-medium">Address:</span> Hyderabad, Telangana, India</li>
          </ul>
        </section>

        {/* Bottom Note */}
        <div className="border-t border-gray-200 pt-6 mt-8 text-center">
          <p className="text-sm text-gray-500">CodeNexusLabs — Learn. Build. Ship.</p>
          <p className="text-xs text-gray-400 mt-1">By using our platform, you agree to these Terms of Service.</p>
        </div>

      </div>
    </div>
  );
};

export default Terms;