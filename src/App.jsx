import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import PlaceholderPage from "./pages/PlaceholderPage";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Companies from "./pages/Companies";
import Jobs from "./pages/Jobs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import JobDetails from "./pages/JobDetails";
import Test from "./pages/Test";
import Blog from "./pages/Blog";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import CompanyProfile from "./pages/CompanyProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentDashboardHome from "./pages/student/StudentDashboardHome";
import MyApplications from "./pages/student/MyApplications";
import Notifications from "./pages/student/Notifications";
import StudentSettings from "./pages/student/StudentSettings";
import StudentDocuments from "./pages/student/StudentDocuments";
import CVBuilder from "./pages/student/CVBuilder";
import ExternalJobs from "./pages/ExternalJobs";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerDashboardHome from "./pages/employer/EmployerDashboardHome";
import ManageJobs from "./pages/employer/ManageJobs";
import SavedJobs from "./pages/student/SavedJobs";
import Applicants from "./pages/employer/Applicants";

import "./App.css";
import Messages from "./pages/student/Messages";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function LegacyDashboard({ role }) {
  const { pathname, search } = useLocation();
  const tail = pathname.split("/").slice(2).join("/") || "dashboard";
  return <Navigate replace to={`/${role}/${tail === "manage-jobs" ? "jobs" : tail}${search}`} />;
}

function App() {
  return (
    <>
      <Routes>
        {/* Auth pages without Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Register />} />
        <Route path="/employer-register" element={<Navigate to="/auth?role=employer" replace />} />
        <Route path="/student-dashboard/*" element={<LegacyDashboard role="student" />} />
        <Route path="/employer-dashboard/*" element={<LegacyDashboard role="employer" />} />

        {/* Main public website pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Navigate to="/career-advice" replace />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/forgot-password" element={<PlaceholderPage title="Forgot password" description="Self-service password recovery is not available yet. Contact GradLink support for help accessing your account." />} />
          <Route path="/pricing" element={<PlaceholderPage title="Pricing & Plans" />} />
          <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="*" element={<PlaceholderPage title="Page not found" description="This page does not exist. Use the navigation to continue." />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/external-jobs" element={<ExternalJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/tests" element={<Test />} />
          <Route path="/career-advice" element={<Blog />} />
          <Route path="/career-advice/:slug" element={<ArticleDetailsPage />} />
          <Route path="/companies/:id" element={<CompanyProfile />} />
        </Route>

        {/* Student dashboard nested routes */}
        <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboardHome />} />
          <Route path="profile" element={<PlaceholderPage title="Student Profile" />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="cv-builder" element={<CVBuilder />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="saved-jobs" element={<SavedJobs />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        {/* Employer dashboard nested routes */}
        <Route path="/employer" element={<ProtectedRoute allowedRole="employer"><EmployerDashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<EmployerDashboardHome />} />
          <Route path="post-job" element={<ManageJobs key="create" initiallyOpen />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="company-profile" element={<PlaceholderPage title="Company Profile" />} />
          <Route path="jobs" element={<ManageJobs key="list" />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
