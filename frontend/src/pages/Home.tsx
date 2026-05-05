import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/common/CourseCard';
import { catalogAPI } from '../services/api';
import { motion, useInView } from 'framer-motion';
import { 
  ArrowRight, BookOpen, Code2, Award, Users, Star, Sparkles, 
  ChevronRight, TrendingUp, Zap, Shield, Globe, FileText, MessageSquare
} from 'lucide-react';

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

const Home = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    catalogAPI.getAllCourses().then((res: any) => {
      setCourses(res.data?.slice(0, 4) || []);
    }).finally(() => setLoading(false));
  }, []);

  const stats = [
    { value: 50, suffix: '+', label: 'Courses', icon: BookOpen, color: 'from-blue-500 to-cyan-500' },
    { value: 10000, suffix: '+', label: 'Learners', icon: Users, color: 'from-emerald-500 to-green-500' },
    { value: 1200, suffix: '+', label: 'This Week', icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
    { value: 95, suffix: '%', label: 'Success Rate', icon: Award, color: 'from-amber-500 to-orange-500' },
  ];

  const features = [
    { icon: Globe, title: 'Expert-Led Content', description: 'Learn from industry professionals with real-world experience.' },
    { icon: Code2, title: 'Interactive Practice', description: 'Write, run, and test code directly in your browser.' },
    { icon: Shield, title: 'Industry Recognition', description: 'Earn certificates recognized by top tech companies.' },
    { icon: Zap, title: 'Career Support', description: 'Get resume reviews, interview prep, and job placement help.' },
  ];

  const quickActions = [
    { icon: BookOpen, label: 'Courses', path: '/courses', color: 'bg-indigo-500 hover:bg-indigo-600', free: true },
    { icon: Code2, label: 'Code Practice', path: '/student/practice', color: 'bg-emerald-500 hover:bg-emerald-600' },
    { icon: FileText, label: 'Resume Builder', path: '/student/resume', color: 'bg-purple-500 hover:bg-purple-600' },
    { icon: MessageSquare, label: 'Interview Prep', path: '/student/interview', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Full Stack Developer at Google', avatar: 'PS', text: 'CodeNexusLabs completely transformed my career. The structured curriculum helped me crack Google interviews.' },
    { name: 'Rahul Verma', role: 'Data Scientist at Microsoft', avatar: 'RV', text: 'The interactive coding environment is a game-changer. Learning complex concepts became so much easier.' },
    { name: 'Ananya Patel', role: 'Software Engineer at Amazon', avatar: 'AP', text: 'Pure, focused content that helped me master DSA and system design without distractions.' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 lg:py-20 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
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

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap gap-2 mt-5">
                {quickActions.map((action) => (
                  <Link
                    key={action.path}
                    to={action.path}
                    className={`text-white text-xs px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-1.5 shadow-md ${action.color}`}
                  >
                    <action.icon className="w-3.5 h-3.5" />
                    {action.label}
                    {action.free && <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded-full">Free</span>}
                  </Link>
                ))}
              </div>

              {/* Stats */}
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

            {/* Right Content */}
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

      {/* Features Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-100 rounded-full text-indigo-700 text-xs font-medium mb-3"><Sparkles className="w-3.5 h-3.5" /> Why Choose Us</div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Why Choose <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">CodeNexusLabs</span></h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">Everything you need to accelerate your tech career</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card p-5 text-center group bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-sm"><feature.icon className="w-5 h-5 text-indigo-600" /></div>
                <h3 className="text-base font-bold text-gray-900 mb-1.5">{feature.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 to-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8"><div><h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Featured Courses</h2><p className="text-base text-gray-500">Start your learning journey today</p></div><Link to="/courses" className="hidden sm:flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:text-indigo-700">View All <ArrowRight className="w-4 h-4" /></Link></div>
          {loading ? (<div className="flex justify-center py-16"><div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{courses.map((course, i) => (<motion.div key={course.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}><CourseCard course={course} /></motion.div>))}</div>
          )}
          <div className="text-center mt-8 sm:hidden"><Link to="/courses" className="btn-secondary text-sm">View All Courses <ArrowRight className="w-4 h-4" /></Link></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10"><h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">What Our Students Say</h2><p className="text-base text-gray-500">Join thousands of successful tech professionals</p></motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-6 bg-gradient-to-br from-white to-slate-50 hover:shadow-md transition-all">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />))}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">{t.avatar}</div><div><p className="font-semibold text-gray-900 text-sm">{t.name}</p><p className="text-xs text-gray-500">{t.role}</p></div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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