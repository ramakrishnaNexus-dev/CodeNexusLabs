import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  Sparkles, ArrowRight, MessageSquare, Users, Globe,
  Building, Calendar, HelpCircle, ExternalLink
} from 'lucide-react';
import { FaLinkedin, FaGithub, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ... rest of your component

  // ... rest of your code

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'support@codenexuslabs.com', link: 'mailto:support@codenexuslabs.com', color: 'from-indigo-500 to-blue-500' },
    { icon: Phone, title: 'Phone', value: ' ', link: 'tel:+919876543210', color: 'from-emerald-500 to-green-500' },
    { icon: MapPin, title: 'Office', value: 'Hyderabad, Telangana, India', link: '#', color: 'from-purple-500 to-pink-500' },
    { icon: Clock, title: 'Working Hours', value: 'Mon-Fri: 9:00 AM - 6:00 PM IST', link: '#', color: 'from-amber-500 to-orange-500' },
  ];
const socialLinks = [
  { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-600' },
  { icon: FaGithub, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
  { icon: FaTwitter, href: '#', label: 'Twitter/X', color: 'hover:text-sky-400' },
  { icon: FaFacebook, href: 'https://www.facebook.com/share/1BW9s48th6/', label: 'Facebook', color: 'hover:text-blue-700' },
  { icon: FaInstagram, href: 'https://www.instagram.com/codenexuslabs?igsh=MWwzdmlzbnh4OWRiMg==', label: 'Instagram', color: 'hover:text-pink-500' },
];

  const faqs = [
    {
      question: 'What types of inquiries can I submit?',
      answer: 'You can reach out for general inquiries, course-related questions, technical support, partnership proposals, or media and press requests. We\'ll route your message to the right team.'
    },
    {
      question: 'How long does it take to get a response?',
      answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, please mention it in the subject line.'
    },
    {
      question: 'Do you offer enterprise or institutional partnerships?',
      answer: 'Yes! We work with companies and educational institutions to provide customized learning solutions. Please mention "Partnership" in your subject line.'
    },
    {
      question: 'Can I report a technical issue or bug?',
      answer: 'Absolutely. Please include detailed steps to reproduce the issue, your browser/device information, and any screenshots if possible.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Contact Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have questions, feedback, or partnership ideas? We'd love to hear from you.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              We respond to all inquiries within 24-48 hours
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTACT INFO CARDS ===== */}
      <section className="py-8 -mt-8 relative z-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.title}
                href={item.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.title}</h4>
                <p className="text-sm font-medium text-gray-800 mt-1">{item.value}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORM + INFO SECTION ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            
            {/* Form Column - 3/5 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-sm text-gray-500 mb-6">Fill out the form below and we'll get back to you promptly.</p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                    <p className="text-gray-500">Thank you for reaching out. We'll respond within 24-48 hours.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 text-indigo-600 font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
                      >
                        <option value="">Select a subject...</option>
                        <option value="general">General Inquiry</option>
                        <option value="course">Course Question</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership Proposal</option>
                        <option value="media">Media / Press</option>
                        <option value="feedback">Feedback &amp; Suggestions</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition resize-y"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary py-3 text-base"
                    >
                      {isSubmitting ? (
                        <>Sending...</>
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      By submitting this form, you agree to our Privacy Policy.
                      We'll never share your information with third parties.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right Sidebar - 2/5 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Social Links */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" /> Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 transition-all duration-300 ${social.color} hover:bg-gray-300 hover:scale-110`}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-indigo-600" /> Quick Links
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/about" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> About CodeNexusLabs
                    </Link>
                  </li>
                  <li>
                    <Link to="/courses" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> Browse Courses
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Office Hours */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100/30">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" /> Office Hours
                </h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex justify-between"><span>Monday - Friday</span><span className="font-medium">9:00 AM - 6:00 PM IST</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span className="font-medium">10:00 AM - 2:00 PM IST</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span className="font-medium text-gray-400">Closed</span></li>
                </ul>
                <p className="text-xs text-gray-400 mt-3">* Support is available 24/7 via email</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-500">Find quick answers to common questions</p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <h4 className="font-semibold text-gray-800 text-sm mb-1.5">{faq.question}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Join 10,000+ Learners</h2>
            <p className="text-base text-white/80 mb-6 max-w-xl mx-auto">
              Start your programming journey with CodeNexusLabs today
            </p>
            <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;