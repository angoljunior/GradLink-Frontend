import { Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "sonner";

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
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentSettings from "./pages/student/StudentSettings";
import StudentDocuments from "./pages/student/StudentDocuments";
import CVBuilder from "./pages/student/CVBuilder";

import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerDashboardHome from "./pages/employer/EmployerDashboardHome";
import ManageJobs from "./pages/employer/ManageJobs";
import Applicants from "./pages/employer/Applicants";

import "./App.css";

function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        {/* Auth pages without Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main public website pages */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/tests" element={<Test />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career-advice/:id" element={<ArticleDetailsPage />} />
          <Route path="/company/:id" element={<CompanyProfile />} />
        </Route>

        {/* Student dashboard nested routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route index element={<StudentDashboardHome />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="cv-builder" element={<CVBuilder />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="notifications" element={<StudentNotifications />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>

        {/* Employer dashboard nested routes */}
        <Route path="/employer-dashboard" element={<EmployerDashboard />}>
          <Route index element={<EmployerDashboardHome />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="applicants" element={<Applicants />} />
          <Route path="documents" element={<StudentDocuments />} />
          <Route path="settings" element={<StudentSettings />} />
        </Route>
      </Routes>

      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
