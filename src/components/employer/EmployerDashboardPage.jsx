import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import EmployerSidebar from "./EmployerSidebar";
import EmployerStats from "./EmployerStats";
import TopPerformingJobsChart from "./TopPerformingJobsChart";
import ApplicationPipeline from "./ApplicationPipeline";
import RecentApplicantsTable from "./RecentApplicantsTable";

const EmployerDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <EmployerSidebar />

      <main className="lg:ml-64 px-6 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
              Employer Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your recruitment pipeline and active jobs.
            </p>
          </div>

          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg">
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8">
          <EmployerStats />
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-6">
          <TopPerformingJobsChart />
          <ApplicationPipeline />
        </div>

        {/* Recent Applicants */}
        <div className="mt-8">
          <RecentApplicantsTable />
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboardPage;