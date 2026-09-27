import { Navigate } from "react-router-dom";
import { SectionCards } from "@/components/section-cards";
import EmployerReport from "@/components/EmployerReport";
import EmployerRecentApplications from "@/components/EmployerRecentApplications";
import DashboardInbox from "@/components/DashboardInbox";
import { Button } from "@/components/ui/button";
import useDashboardSummary from "@/hooks/useDashboardSummary";

export default function EmployerDashboardHome() {
  const { data, error, loading, refresh } = useDashboardSummary("employer");
  if (error === "unauthorized") return <Navigate to="/login" replace />;
  return <div className="flex flex-1 flex-col"><div className="@container/main flex flex-1 flex-col gap-2">
    <div className="mx-5 flex items-center justify-between gap-3"><div><h1 className="text-2xl font-bold tracking-tight">Employer Report{data?.company?.name ? ` · ${data.company.name}` : ""}</h1><p className="text-muted-foreground">View and analyze job applications, candidate activity, and hiring performance.</p></div><Button variant="outline" disabled={loading} onClick={refresh}>{loading ? "Loading…" : "Refresh"}</Button></div>
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      {error && <p role="alert" className="mx-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error} Use Refresh to retry.</p>}
      {!data && loading && <p role="status" className="mx-6 py-8">Loading your dashboard…</p>}
      {data && <>
        {!data.company && <p className="mx-6 text-sm text-muted-foreground">No company profile has been created for your account yet.</p>}
        <SectionCards metrics={data.metrics} role="employer" />
        <EmployerReport data={data} />
        <EmployerRecentApplications suppliedApplications={data.recent_applicants} onStatusChanged={refresh} />
        <DashboardInbox data={data} role="employer" />
      </>}
    </div>
  </div></div>;
}
