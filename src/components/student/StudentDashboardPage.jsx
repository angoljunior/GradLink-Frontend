import StudentSidebar from "./StudentSidebar";
import DashboardStats from "./DashboardStats";
import RecentApplications from "./RecentApplications";
import RecommendedJobs from "./RecommendedJobs";

const StudentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <StudentSidebar />

      <main className="lg:ml-64 px-6 md:px-8 py-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
            Welcome back, Abena!
          </h1>
          <p className="mt-1 text-lg text-slate-500">
            Here&apos;s an overview of your career progress.
          </p>
        </div>

        <div className="mt-8">
          <DashboardStats />
        </div>

        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-8">
          <RecentApplications />
          <RecommendedJobs />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboardPage;