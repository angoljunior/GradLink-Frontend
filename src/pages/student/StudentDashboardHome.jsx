import { Link, Navigate } from "react-router-dom";
import { SectionCards } from "@/components/section-cards";
import SDashboardInfo from "@/components/SDashboardInfo";
import DashboardInbox from "@/components/DashboardInbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useDashboardSummary from "@/hooks/useDashboardSummary";

export default function StudentDashboardHome() {
  const { data, error, loading, refresh } = useDashboardSummary("student");
  if (error === "unauthorized") return <Navigate to="/login" replace />;
  return <div className="flex flex-1 flex-col"><div className="@container/main flex flex-1 flex-col gap-2"><div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
    <div className="mx-6 flex items-center justify-between gap-3"><div><h1 className="text-2xl font-bold">{data?.profile ? `${data.profile.first_name || "Student"}'s Dashboard` : "Student Dashboard"}</h1>{data?.profile && <p className="text-sm text-muted-foreground">{[data.profile.programme, data.profile.university].filter(Boolean).join(" · ")}</p>}</div><Button variant="outline" disabled={loading} onClick={refresh}>{loading ? "Loading…" : "Refresh"}</Button></div>
    {error && <p role="alert" className="mx-6 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error} Use Refresh to retry.</p>}
    {!data && loading && <p role="status" className="mx-6 py-8">Loading your dashboard…</p>}
    {data && <>
      {!data.profile && <p className="mx-6 text-sm text-muted-foreground">Your student profile has not been created yet. Complete your profile to get started.</p>}
      <SectionCards metrics={data.metrics} />
      <SDashboardInfo applications={data.recent_applications} />
      <Card className="mx-4 lg:mx-6"><CardHeader><CardTitle>Recommended Jobs</CardTitle></CardHeader><CardContent>
        {data.recommended_jobs.length ? <ul className="divide-y">{data.recommended_jobs.map((job) => <li key={job.id} className="py-3"><Link to={`/jobs/${job.id}`} className="font-medium text-yellow-700 hover:underline">{job.title}</Link><p className="text-sm text-muted-foreground">{job.company__name} · {job.location}</p><p className="text-xs text-muted-foreground">Match score: {job.match_score} · Apply by {job.deadline}</p></li>)}</ul> : <p className="text-sm text-muted-foreground">No recommendations are available yet. <Link to="/jobs" className="text-yellow-700 underline">Browse current jobs</Link>.</p>}
      </CardContent></Card>
      {data.ai_cv_review && <Card className="mx-4 lg:mx-6"><CardHeader><CardTitle>Latest CV Review</CardTitle></CardHeader><CardContent><p className="whitespace-pre-wrap text-sm">{data.ai_cv_review.feedback}</p>{data.ai_cv_review.recommended_skills && <p className="mt-3 text-sm text-muted-foreground">Suggested skills: {data.ai_cv_review.recommended_skills}</p>}</CardContent></Card>}
      <DashboardInbox data={data} role="student" />
    </>}
  </div></div></div>;
}
