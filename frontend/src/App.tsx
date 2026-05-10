import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute, { AdminRoute } from './components/common/ProtectedRoute';
import StudentLayout from './layouts/StudentLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import CourseList from './pages/courses/CourseList';
import CourseDetail from './pages/courses/CourseDetail';
import AdminDashboard from './pages/admin/Dashboard';
import CourseManagement from './pages/admin/CourseManagement';
import CourseTopics from './pages/admin/CourseTopics';
import UserManagement from './pages/admin/UserManagement';
import InterviewManagement from './pages/admin/InterviewManagement';
import QuizManagement from './pages/admin/QuizManagement';
import Analytics from './pages/admin/Analytics';
import StudentDashboard from './pages/student/Dashboard';
import ResumeBuilder from './pages/student/ResumeBuilder';
import CodePractice from './pages/student/CodePractice';
import InterviewPrep from './pages/student/InterviewPrep';
import QuizPage from './pages/student/QuizPage';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import { useEffect } from 'react';
import API from './services/api';
//import CategoryManagement from './pages/admin/CategoryManagement';
import CategoryManagement from './pages/admin/CategoryManagement';

import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

function AppContent() {
  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId') || 'sess-' + Date.now();
    localStorage.setItem('sessionId', sessionId);
    const trackPage = () => {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      API.post('/analytics/track', {
        pageUrl: window.location.pathname,
        sessionId: sessionId,
        userEmail: user.email || null,
      }).catch(() => {});
    };
    trackPage();
    const interval = setInterval(trackPage, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Routes>
      <Route element={<StudentLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />


      <Route path="/student" element={<ProtectedRoute><StudentLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="resume" element={<ResumeBuilder />} />
        <Route path="practice" element={<CodePractice />} />
        <Route path="interview" element={<InterviewPrep />} />
        <Route path="quiz/:courseId" element={<QuizPage />} />
      </Route>

      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses/:id" element={<CourseTopics />} />
        <Route path="courses" element={<CourseManagement />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="interview" element={<InterviewManagement />} />
        <Route path="quizzes" element={<QuizManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="categories" element={<CategoryManagement />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" />
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}