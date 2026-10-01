import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCheckIcon, FileTextIcon, BookmarkIcon, BriefcaseIcon } from "lucide-react";

export function SectionCards({ metrics, role = "student" }) {
  const stats = role === "employer" ? [
    { title: "Active Jobs", value: metrics.active_jobs, description: "Approved jobs accepting applications", footerText: `${metrics.total_jobs} total jobs · ${metrics.pending_jobs} awaiting approval`, icon: BriefcaseIcon },
    { title: "Total Applications", value: metrics.total_applications, description: "Applications to your company's jobs", footerText: "Includes all recruitment statuses", icon: FileTextIcon },
    { title: "Shortlisted Candidates", value: metrics.shortlisted_candidates, description: "Candidates currently shortlisted", footerText: "Distinct candidates across your jobs", icon: BookmarkIcon },
    { title: "Hired Candidates", value: metrics.hired_candidates, description: "Candidates with hired applications", footerText: "Distinct candidates across your jobs", icon: UserCheckIcon },
  ] : [
    { title: "Profile Completion", value: `${metrics.profile_completion}%`, description: "Based on your saved profile", footerText: "Name, education, location, skills and CV", icon: UserCheckIcon },
    { title: "AI CV Score", value: metrics.ai_cv_score ?? "Not available", description: metrics.ai_cv_score == null ? "No CV review recorded yet" : "Latest recorded CV review", footerText: "A score appears when a review is available", icon: FileTextIcon },
    { title: "Saved Jobs", value: metrics.saved_jobs, description: "Jobs in your saved list", footerText: "Review your saved jobs before their deadlines", icon: BookmarkIcon },
    { title: "Applied Jobs", value: metrics.applied_jobs, description: "Your submitted applications", footerText: "Includes all recruitment statuses", icon: BriefcaseIcon },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {stats.map(({ icon: Icon, ...stat }) => (
        <Card key={stat.title} className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-2"><Icon className="size-4" />{stat.title}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">{stat.value}</CardTitle>
            <CardAction><Badge variant="outline">{stat.value === "Not available" ? "No review" : "Current"}</Badge></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">{stat.description}</div>
            <div className="text-muted-foreground">{stat.footerText}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
