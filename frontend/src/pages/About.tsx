import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Code2, FileText, MessageSquare, GraduationCap,
  Users, Award, TrendingUp, Zap, Shield, Globe, Sparkles,
  ArrowRight, CheckCircle2, Star, Heart, Quote, Briefcase,
  Target, Eye, Flag, User, Layers, Cpu, Rocket
} from 'lucide-react';

const About = () => {
  const stats = [
    { value: 50, suffix: '+', label: 'Courses', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { value: 10000, suffix: '+', label: 'Learners', icon: Users, color: 'from-emerald-500 to-green-500' },
    { value: 1200, suffix: '+', label: 'This Week', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: Award, color: 'from-amber-500 to-orange-500' },
  ];

  const offerings = [
    { icon: BookOpen, title: '50+ Structured Courses', description: 'From Core Java, Spring Boot, and Microservices to Docker, Kafka, and Cloud technologies', color: 'indigo' },
    { icon: Code2, title: 'Interactive Coding Environment', description: 'Write, run, and test code directly in your browser with real-time feedback', color: 'emerald' },
    { icon: MessageSquare, title: 'AI-Powered Interview Prep', description: 'Practice with adaptive mock interviews that mirror real technical screening processes', color: 'purple' },
    { icon: FileText, title: 'Professional Resume Builder', description: 'Create job-ready resumes that help you stand out to top employers', color: 'orange' },
    { icon: GraduationCap, title: 'Topic-Specific MCQs', description: 'Reinforce learning with targeted knowledge checks and quizzes', color: 'rose' },
    { icon: Briefcase, title: 'Career-Focused Learning', description: 'Every course is designed to prepare you for real-world roles in software engineering', color: 'teal' },
  ];

  const values = [
    { icon: Zap, title: 'Built from Real Experience', description: 'Every course is shaped by the challenges and technologies developers face in production environments.', color: 'from-amber-500 to-orange-500' },
    { icon: Users, title: 'Trusted by 10,000+ Learners', description: 'Our community spans beginners to experienced professionals, with a 95% success rate.', color: 'from-emerald-500 to-green-500' },
    { icon: Shield, title: 'Always Evolving', description: 'We continuously refine our curriculum based on student feedback and industry changes.', color: 'from-indigo-500 to-purple-500' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Full Stack Developer at Google', text: 'CodeNexusLabs transformed my career. The structured curriculum helped me crack Google interviews.' },
    { name: 'Rahul Verma', role: 'Data Scientist at Microsoft', text: 'The interactive coding environment is a game-changer. Learning complex concepts became so much easier.' },
    { name: 'Ananya Patel', role: 'Software Engineer at Amazon', text: 'Pure, focused content that helped me master DSA and system design without distractions.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
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
              <Sparkles className="w-3.5 h-3.5" /> About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              CodeNexus<span className="text-indigo-600">Labs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Learn. Build. Ship. — Structured programming education for the next generation of developers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== COMPANY PROFILE & BRAND ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Company Profile &amp; Brand</h2>
            </div>
            
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                CodeNexusLabs is a comprehensive programming education platform designed to empower 
                learners at every stage of their software development journey — from foundational 
                concepts to advanced, production-ready skills.
              </p>
              <p>
                With a commitment to structured learning and career-focused outcomes, we serve a 
                growing community of developers worldwide through:
              </p>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>50+ in-depth courses across in-demand technologies</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>Interactive coding environments with real-time feedback</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>AI-powered interview preparation with adaptive mock interviews</span>
                </li>
                <li className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600 mt-0.5" />
                  <span>Professional resume builder tools for job applications</span>
                </li>
              </ul>

              <p className="mt-4">
                We are particularly recognized for our comprehensive interview preparation resources, 
                which have helped countless learners secure roles at leading technology companies 
                through curated content, AI-driven practice, and real-world problem-solving.
              </p>
              <p>
                Our curriculum is developed and continuously refined by experienced engineers who 
                have built production-grade applications and understand the demands of the modern 
                software industry. Every course module, code example, and project is rooted in 
                practical experience — not theoretical abstraction.
              </p>
              <p>
                Beyond being a learning platform, CodeNexusLabs is a community — a collaborative 
                space where learners, builders, and creators come together to grow, share knowledge, 
                and stay ahead in an ever-evolving technological landscape.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BANNER ===== */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-indigo-100/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-sm`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}{stat.suffix}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE OFFER ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">What We Offer</h2>
            <p className="text-lg text-gray-500">Everything you need to go from beginner to job-ready</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION, VISION, MOTTO ===== */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Corporate History, Mission, Vision &amp; Motto</h2>
          </motion.div>

          {/* Corporate History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Corporate History</h3>
            </div>
            <p className="text-gray-600 leading-relaxed pl-14">
              CodeNexusLabs was founded on a singular conviction: that high-quality programming 
              education should be accessible to all, regardless of background or financial means. 
              What began as an effort to simplify complex coding concepts has grown into a 
              full-spectrum educational platform, supporting learners across programming, skill 
              development, interview preparation, and career advancement.
            </p>
          </motion.div>

          {/* Mission, Vision, Motto Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Target, 
                title: 'Mission', 
                description: 'To empower learners across domains by providing accessible, high-quality, structured educational content that bridges the gap between theoretical knowledge and practical application — enabling them to excel in their careers and beyond.',
                color: 'from-emerald-500 to-green-500'
              },
              { 
                icon: Eye, 
                title: 'Vision', 
                description: 'To become the most comprehensive, inclusive, and trusted learning platform — equipping individuals from all walks of life with the knowledge, confidence, and skills to succeed in their technical careers.',
                color: 'from-indigo-500 to-purple-500'
              },
              { 
                icon: Flag, 
                title: 'Motto', 
                description: '"Learn. Build. Ship." — A commitment to structured learning, hands-on practice, and continuous growth, one step at a time.',
                color: 'from-amber-500 to-orange-500'
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CODENEXUSLABS ===== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Why CodeNexusLabs?</h2>
            <p className="text-lg text-gray-500">Built by developers, for developers</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-xl text-white bg-gradient-to-br ${item.color} shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <item.icon className="w-8 h-8 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOUNDER SECTION ===== */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Company Founder</h2>
            <div className="mt-8 p-8 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
                CodeNexusLabs was built by developers who understand the challenges of accessing 
                quality education. Founded by a passionate engineer who experienced firsthand the 
                barriers to entry in the tech industry, the platform was created to solve a real 
                problem — not to sell a product.
              </p>
              <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mt-4">
                Every course, tool, and feature is designed with a single objective: to help 
                learners transition from their first line of code to their first day on the job 
                with confidence and competence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">What Our Students Say</h2>
            <p className="text-lg text-gray-500">Join 10,000+ successful tech professionals</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Ready to Transform Your Career?</h2>
            <p className="text-base text-white/80 mb-6 max-w-xl mx-auto">
              Join 10,000+ learners already building their future with CodeNexusLabs
            </p>
            <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;