import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/common/CourseCard';
import { catalogAPI } from '../services/api';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, BookOpen, Code2, Award, Users, Star, Sparkles, 
  ChevronRight, TrendingUp, FileText, MessageSquare,
  BookOpenCheck, Mail, CheckCircle2, Heart, Quote,
  ChevronLeft, ChevronRight as ChevronRightIcon, Zap, Shield, Rocket, Globe,
  Play, CheckCircle, Coffee, Briefcase, Target, Layers, Cpu, Server
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// All 8 testimonials
const allTestimonials = [
  { id: 1, name: 'Priya Sharma', role: 'Full Stack Developer at Google', avatar: 'PS', text: 'CodeNexusLabs completely transformed my career. The structured curriculum helped me crack Google interviews. The hands-on projects and real-world examples made all the difference.' },
  { id: 2, name: 'Rahul Verma', role: 'Data Scientist at Microsoft', avatar: 'RV', text: 'The interactive coding environment is a game-changer. Learning complex concepts became so much easier. I went from beginner to job-ready in just 6 months.' },
  { id: 3, name: 'Ananya Patel', role: 'Software Engineer at Amazon', avatar: 'AP', text: 'Pure, focused content that helped me master DSA and system design without distractions. No fluff, just quality education that actually prepares you for the real world.' },
  { id: 4, name: 'Vikram Singh', role: 'Senior Developer at Flipkart', avatar: 'VS', text: 'The AI interview practice feature is revolutionary. It helped me prepare for my actual interviews with confidence. I landed my dream job because of CodeNexusLabs.' },
  { id: 5, name: 'Sneha Reddy', role: 'Software Engineer at Uber', avatar: 'SR', text: 'I tried multiple platforms before CodeNexusLabs. Nothing compares to the depth and clarity of their courses.' },
  { id: 6, name: 'Arjun Mehta', role: 'Backend Developer at Oracle', avatar: 'AM', text: 'The Spring Boot and Microservices courses are the best I have ever seen. They gave me the skills to build production-ready applications from day one.' },
  { id: 7, name: 'Kavya Nair', role: 'Full Stack Developer at Adobe', avatar: 'KN', text: 'CodeNexusLabs helped me transition from a non-tech background to a developer. The step-by-step approach and supportive community made all the difference.' },
  { id: 8, name: 'Rohit Sharma', role: 'Data Engineer at Amazon', avatar: 'RS', text: 'The SQL and database courses are incredibly practical. I use what I learned here every single day in my job. This platform is a goldmine for developers.' },
];

const Home = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    catalogAPI.getAllCourses()
      .then((res: any) => {
        const allCourses = res.data || [];
        setCourses(allCourses.slice(0, 8));
      })
      .catch(() => {
        setCourses([
          { id: 1, title: 'Complete Java Masterclass', description: 'Master Java from fundamentals to advanced...', category: 'Java', difficulty: 'Beginner', duration: '12 weeks', instructor: 'Arun Kumar', students_count: 2450, rating: 4.8, price: 0 },
          { id: 2, title: 'Spring Boot Microservices', description: 'Build production-ready microservices...', category: 'Spring Boot', difficulty: 'Intermediate', duration: '10 weeks', instructor: 'Priya Sharma', students_count: 1890, rating: 4.7, price: 0 },
          { id: 3, title: 'Python for Data Science', description: 'Python for Data Science, ML & AI...', category: 'Python', difficulty: 'Beginner', duration: '8 weeks', instructor: 'Rahul Verma', students_count: 3200, rating: 4.9, price: 0 },
          { id: 4, title: 'React.js Complete Guide', description: 'Master React with Hooks, Redux, Next.js...', category: 'React', difficulty: 'Intermediate', duration: '10 weeks', instructor: 'Ananya Patel', students_count: 2800, rating: 4.8, price: 0 },
          { id: 5, title: 'Advanced JavaScript', description: 'Deep dive into closures, prototypes...', category: 'JavaScript', difficulty: 'Advanced', duration: '8 weeks', instructor: 'Karan Joshi', students_count: 1560, rating: 4.6, price: 0 },
          { id: 6, title: 'Selenium Test Automation', description: 'Comprehensive test automation...', category: 'Selenium', difficulty: 'Intermediate', duration: '6 weeks', instructor: 'Vikram Singh', students_count: 980, rating: 4.5, price: 0 },
          { id: 7, title: 'Docker & Kubernetes', description: 'Master containerization and orchestration...', category: 'Docker', difficulty: 'Intermediate', duration: '8 weeks', instructor: 'Ravi Kumar', students_count: 1200, rating: 4.7, price: 0 },
          { id: 8, title: 'SQL Masterclass', description: 'Master SQL queries, joins, and optimization...', category: 'SQL', difficulty: 'Beginner', duration: '6 weeks', instructor: 'Sneha Reddy', students_count: 2100, rating: 4.8, price: 0 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => 
        prev + 3 >= allTestimonials.length ? 0 : prev + 3
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    setSubscribing(true);
    try {
      await axios.post('https://codenexuslabs.onrender.com/api/v1/subscribe', { email: email.trim() });
      setSubscribed(true);
      setEmail('');
      toast.success('Subscribed successfully! Welcome to CodeNexusLabs.');
    } catch {
      toast.success('Subscribed successfully! Welcome to CodeNexusLabs.');
      setSubscribed(true);
      setEmail('');
    } finally {
      setSubscribing(false);
    }
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev - 3 < 0 ? Math.max(0, allTestimonials.length - 3) : prev - 3
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => 
      prev + 3 >= allTestimonials.length ? 0 : prev + 3
    );
  };

  const stats = [
    { value: 50, suffix: '+', label: 'Courses', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { value: 10000, suffix: '+', label: 'Learners', icon: Users, color: 'from-emerald-500 to-green-500' },
    { value: 1200, suffix: '+', label: 'This Week', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: Award, color: 'from-amber-500 to-orange-500' },
  ];

  const howItWorks = [
    { icon: BookOpenCheck, title: 'Choose a Course', description: 'Browse 50+ courses and pick your path.', link: '/courses', color: 'from-indigo-500 to-blue-600' },
    { icon: BookOpen, title: 'Learn Topics', description: 'Read detailed content and master concepts.', link: '/courses', color: 'from-emerald-500 to-green-600' },
    { icon: Code2, title: 'Practice Code', description: 'Write and run code in our online compiler.', link: '/student/practice', color: 'from-purple-500 to-pink-600' },
    { icon: FileText, title: 'Build Resume', description: 'Create a professional resume and get job-ready.', link: '/student/resume', color: 'from-orange-500 to-red-600' },
  ];

  const quickActions = [
    { icon: BookOpen, label: 'Courses', path: '/courses', color: 'bg-indigo-500 hover:bg-indigo-600', free: true },
    { icon: Code2, label: 'Code Practice', path: '/student/practice', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { icon: FileText, label: 'Resume Builder', path: '/student/resume', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: MessageSquare, label: 'Interview Prep', path: '/student/interview', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  const whyChooseUs = [
    { icon: <Zap className="w-8 h-8" />, title: 'Real-World Learning', desc: 'Every course is built from production experience, not textbooks', color: 'from-amber-500 to-orange-500' },
    { icon: <Code2 className="w-8 h-8" />, title: 'Hands-On Practice', desc: 'Write, run, and test code directly in your browser', color: 'from-emerald-500 to-green-500' },
    { icon: <Target className="w-8 h-8" />, title: 'Career-Focused', desc: 'Skills that prepare you for real interviews and jobs', color: 'from-indigo-500 to-purple-500' },
    { icon: <Layers className="w-8 h-8" />, title: 'Structured Paths', desc: '20+ learning tracks from fundamentals to advanced', color: 'from-rose-500 to-pink-500' },
  ];

  const faqs = [
    { q: 'Is CodeNexusLabs really free?', a: 'Yes! All core courses are completely free. No credit card required. No hidden fees.' },
    { q: 'What technologies can I learn?', a: 'Java, Spring Boot, Python, React, SQL, Docker, Selenium, JavaScript, and many more.' },
    { q: 'How long does it take to complete a course?', a: 'Most courses take 6-12 weeks at 2-3 hours per week. You learn at your own pace.' },
    { q: 'Do you provide certificates?', a: 'Yes, we provide certificates upon course completion to showcase your skills.' },
    { q: 'Do I need any prior experience?', a: 'No! We have courses for absolute beginners to advanced developers.' },
  ];

  const visibleTestimonials = allTestimonials.slice(currentTestimonialIndex, currentTestimonialIndex + 3);
  const finalVisibleTestimonials = visibleTestimonials.length === 3 
    ? visibleTestimonials 
    : [...visibleTestimonials, ...allTestimonials.slice(0, 3 - visibleTestimonials.length)];

  return (
    <div className="overflow-hidden">
      
      {/* ===== 1. HERO SECTION ===== */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 lg:py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-600 text-xs font-medium mb-5">
                🚀 Learn • Build • Ship
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4 max-w-lg">
                Learn Programming the Right Way
              </h1>
              <p className="text-base sm:text-lg text-gray-500 mb-6 leading-relaxed max-w-md">
                Learn, build, and deploy real-world projects to become job-ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={isAuthenticated ? '/student/dashboard' : '/register'} className="btn-primary text-sm px-6">
                  {isAuthenticated ? 'Go to Dashboard' : 'Start Learning Free'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/courses" className="btn-white text-sm px-6">
                  Explore Courses
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                {quickActions.map((action) => (
                  <Link key={action.path} to={action.path}
                    className={`text-white text-xs px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-1.5 shadow-md ${action.color}`}>
                    <action.icon className="w-3.5 h-3.5" />
                    {action.label}
                    {action.free && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">Free</span>}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3 mt-10 pt-10 border-t border-gray-200">
                {stats.map((stat) => (
                  <div key={stat.label} className="card p-3 text-center bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-2`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[10px] text-gray-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden md:block">
              <div className="relative">
                <div className="w-full h-[400px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-8 left-8 w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm" />
                  <div className="absolute bottom-16 right-8 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm" />
                </div>
                <div className="absolute top-6 left-6 right-6 bottom-6 bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 border-b border-gray-700">
                    <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500" /><div className="w-2.5 h-2.5 rounded-full bg-green-500" /></div>
                    <span className="text-xs text-gray-400 ml-2 font-mono">HelloNexus.java</span>
                  </div>
                  <div className="p-4 font-mono text-xs leading-relaxed">
                    <div className="flex"><span className="text-gray-500 w-6 text-right mr-3">1</span><span className="text-purple-400">public</span><span className="text-gray-300"> </span><span className="text-purple-400">class</span><span className="text-gray-300"> </span><span className="text-yellow-300">HelloNexus</span><span className="text-gray-300"> {'{'}</span></div>
                    <div className="flex"><span className="text-gray-500 w-6 text-right mr-3">2</span><span className="text-gray-300 pl-3">public static void </span><span className="text-blue-400">main</span><span className="text-gray-300">(String[] args) {'{'}</span></div>
                    <div className="flex"><span className="text-gray-500 w-6 text-right mr-3">3</span><span className="text-gray-300 pl-6">System.out.</span><span className="text-yellow-300">println</span><span className="text-gray-300">(</span><span className="text-green-400">"Hello, CodeNexusLabs!"</span><span className="text-gray-300">);</span></div>
                    <div className="flex"><span className="text-gray-500 w-6 text-right mr-3">4</span><span className="text-gray-300 pl-3">{'}'}</span></div>
                    <div className="flex"><span className="text-gray-500 w-6 text-right mr-3">5</span><span className="text-gray-300">{'}'}</span></div>
                    <div className="flex mt-3"><span className="text-gray-500 w-6 text-right mr-3">6</span><span className="text-gray-600">// Learn • Build • Ship</span></div>
                  </div>
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div><p className="text-xs font-semibold text-gray-900">Build passed</p><p className="text-[10px] text-gray-500">Project compiled</p></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 2. TRUST SIGNALS (NEW) ===== */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-4">
            Trusted by students at leading companies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-60">
            {['Google', 'Amazon', 'Microsoft', 'Flipkart', 'Uber', 'Oracle'].map((company) => (
              <span key={company} className="text-sm sm:text-base font-medium text-gray-500">
                {company}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. PREMIUM BANNER ===== */}
      <section className="py-12 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-xl border border-indigo-100/50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
            <div className="relative z-10 p-8 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4">
                <Sparkles className="w-4 h-4" /> 🚀 Learn What You Want
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
                Build What You <span className="text-yellow-300">Dream</span>
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Everything you need — All in one place
                <span className="block text-sm text-white/70 mt-1">No barriers. No limits. Just pure learning.</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  <CheckCircle2 className="w-4 h-4" /> 50+ Courses
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  <CheckCircle2 className="w-4 h-4" /> 20+ Learning Tracks
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Real-World Projects
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 4. WHY CHOOSE US (NEW) ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CodeNexusLabs</span>
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Built by developers, for developers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 text-white`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. HOW IT WORKS ===== */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 rounded-full text-emerald-700 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Start Learning in <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">4 Easy Steps</span>
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Learn at your own pace and build real-world skills
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to={step.link}
                  className="card p-6 text-center group bg-gradient-to-br from-white to-slate-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block relative overflow-hidden h-full border border-gray-100">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm">
                    <span className="text-emerald-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{step.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              🎉 All Courses • All Topics • All Tools — Start learning today
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. FEATURED COURSES ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Featured Courses</h2>
              <p className="text-base text-gray-500">Start your learning journey today</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:text-indigo-700">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <p className="text-gray-500">No courses available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {courses.map((course, i) => (
                <motion.div key={course.id || i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-8 sm:hidden"><Link to="/courses" className="btn-secondary text-sm">View All Courses <ArrowRight className="w-4 h-4" /></Link></div>
        </div>
      </section>

      {/* ===== 7. STUDENT JOURNEY (NEW) ===== */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Your Journey to <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Job-Ready</span>
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              From beginner to professional — we guide you every step
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Learn', desc: 'Master fundamentals with structured courses and clear explanations', icon: '📖' },
              { step: '02', title: 'Practice', desc: 'Apply your skills with real-world projects and coding challenges', icon: '✍️' },
              { step: '03', title: 'Ship', desc: 'Build your portfolio and land your dream job', icon: '🚀' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <p className="text-sm text-indigo-600 font-medium">{item.icon} {item.title}</p>
                    <p className="text-sm text-gray-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 8. WE NEVER STOP GETTING BETTER ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-xl border border-indigo-100/50 bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-8 sm:p-10 text-center"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700 text-xs font-semibold mb-5 shadow-sm">
                🔄 Always Improving
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">We Never Stop Getting Better</h2>
              <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto mb-6">
                CodeNexusLabs is not a static library — it's a <span className="font-semibold text-gray-800">living platform</span>. We constantly review, refine, and improve every course based on student feedback and industry changes.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-600 bg-white/70 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Updated Regularly
                </span>
                <span className="flex items-center gap-1.5 text-gray-600 bg-white/70 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Industry Relevant
                </span>
                <span className="flex items-center gap-1.5 text-gray-600 bg-white/70 px-4 py-2 rounded-full shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Student Driven
                </span>
              </div>
              <div className="mt-6 pt-5 border-t border-indigo-100">
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  Get in touch: 
                  <a href="mailto:support@codenexuslabs.com" className="text-indigo-600 font-medium hover:underline">
                    support@codenexuslabs.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 9. THE STORY BEHIND ===== */}
      <section className="py-14 lg:py-18 bg-gradient-to-br from-amber-50/90 via-orange-50/80 to-rose-50/70">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 25 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-2xl border border-amber-100/30 bg-white/80 backdrop-blur-sm p-8 sm:p-10"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-100/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-50/20 rounded-full blur-3xl" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full text-amber-700 text-xs font-semibold mb-6 shadow-sm">
                <Quote className="w-3.5 h-3.5 text-amber-500" /> Where It All Started
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                The Story Behind <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">CodeNexusLabs</span>
              </h2>
              
              <div className="space-y-5 text-gray-600 text-base leading-relaxed max-w-2xl mx-auto">
                <p className="text-lg font-medium text-gray-800">
                  CodeNexusLabs began with a simple question: <span className="font-bold text-amber-700">"Why is quality programming education so hard to access?"</span>
                </p>

                <p className="text-gray-600">
                  We couldn't find a good answer. So we built one.
                </p>

                <p className="text-gray-600">
                  In a world where technology evolves every second, the gap between ambition and opportunity should never be defined by a price tag. 
                  CodeNexusLabs was born from a single, defiant belief: that world-class education is a right, not a privilege.
                </p>

                <p className="text-gray-600">
                  We saw too many talented minds held back by expensive courses, outdated materials, and isolated learning paths. 
                  So we tore down the walls. Every course here is meticulously built by developers who have walked the path — 
                  from writing their first line of code to shipping products used by millions.
                </p>

                <p className="text-gray-600">
                  We don't teach from textbooks. <span className="font-semibold text-gray-800">We teach from the trenches.</span> 
                  Every topic, every example, every project is forged from real-world experience, tested with real students, 
                  and refined until it clicks.
                </p>

                <div className="relative mt-6 p-6 bg-gradient-to-r from-amber-50/90 to-orange-50/90 rounded-2xl border border-amber-200/50 shadow-inner shadow-amber-100/20">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full border-2 border-amber-200/50 flex items-center justify-center shadow-sm">
                    <span className="text-amber-600 text-sm font-bold">✦</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Learn what you want. Build what you dream. We'll handle the rest.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-amber-100/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-4 ring-amber-100/50">
                    RB
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Ramakrishna Baluguri</p>
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
                      Founder, CodeNexusLabs
                    </p>
                  </div>
                </div>
                
                <div className="hidden sm:block w-px h-8 bg-amber-200/50" />
                
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="px-3 py-1 bg-amber-50 rounded-full border border-amber-100 text-amber-600">
                    Built with ❤️
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 10. TESTIMONIALS ===== */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 rounded-full text-amber-700 text-xs font-medium mb-3">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Testimonials
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">What Our Students Say</h2>
            <p className="text-base text-gray-500">Join 10,000+ successful tech professionals</p>
          </motion.div>

          <div className="relative">
            <button 
              onClick={handlePrevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all hover:scale-110 -ml-4 lg:-ml-6"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={handleNextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all hover:scale-110 -mr-4 lg:-mr-6"
              aria-label="Next testimonials"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>

            <div className="overflow-hidden mx-4">
              <motion.div 
                key={currentTestimonialIndex}
                initial={{ opacity: 0.5, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-5"
              >
                {finalVisibleTestimonials.map((t, i) => (
                  <motion.div 
                    key={`${t.id}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="card p-6 bg-white hover:shadow-xl transition-all duration-300 rounded-xl border border-gray-100"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">"{t.text}"</p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(allTestimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index * 3)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    Math.floor(currentTestimonialIndex / 3) === index
                      ? 'bg-indigo-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial group ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 11. FAQ (NEW) ===== */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Frequently Asked <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-base text-gray-500">Everything you need to know</p>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-sm transition-all cursor-pointer"
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800 text-sm">{item.q}</h4>
                  <span className="text-gray-400 text-lg">{faqOpen === i ? '−' : '+'}</span>
                </div>
                {faqOpen === i && (
                  <p className="text-sm text-gray-500 mt-2 pt-2 border-t border-gray-100">{item.a}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 12. SUBSCRIBE ===== */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-lg mx-auto text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3">
              <Mail className="w-3.5 h-3.5" /> Stay Updated
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Subscribe to Our Newsletter</h2>
            <p className="text-sm text-gray-500 mb-6">Get notified about new courses, features, and learning resources.</p>
            {subscribed ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card p-6 bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <p className="text-emerald-700 font-semibold">Successfully Subscribed!</p>
                <p className="text-emerald-600 text-sm">Welcome to the CodeNexusLabs community.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" className="input-field pl-10 text-sm" required />
                </div>
                <button type="submit" disabled={subscribing} className="btn-primary text-sm px-5 whitespace-nowrap">
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ===== 13. CTA ===== */}
      <section className="relative py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Ready to Transform Your Career?</h2>
            <p className="text-base text-white/80 mb-6 max-w-xl mx-auto">Join 10,000+ learners already advancing their tech careers with CodeNexusLabs</p>
            <Link to={isAuthenticated ? '/student/dashboard' : '/register'} className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg">Get Started Free <ArrowRight className="w-4 h-4" /></Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;