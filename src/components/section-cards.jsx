"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TrendingUpIcon,
  TrendingDownIcon,
  UserCheckIcon,
  FileTextIcon,
  BookmarkIcon,
  BriefcaseIcon,
} from "lucide-react";

export function SectionCards() {
  const studentStats = [
    {
      title: "Profile Completion",
      value: "75%",
      badge: "+15%",
      trend: "up",
      description: "Profile almost complete",
      footerText: "Add your skills and certificates to improve visibility",
      icon: UserCheckIcon,
    },
    {
      title: "AI CV Score",
      value: "82%",
      badge: "+8%",
      trend: "up",
      description: "Strong CV performance",
      footerText: "Your CV is well structured for employer screening",
      icon: FileTextIcon,
    },
    {
      title: "Saved Jobs",
      value: "18",
      badge: "+6",
      trend: "up",
      description: "Jobs saved recently",
      footerText: "Review your saved jobs and apply before deadlines",
      icon: BookmarkIcon,
    },
    {
      title: "Applied Jobs",
      value: "24",
      badge: "-2%",
      trend: "down",
      description: "Application activity is lower",
      footerText: "Apply to more matching jobs to increase your chances",
      icon: BriefcaseIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      {studentStats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon =
          stat.trend === "up" ? TrendingUpIcon : TrendingDownIcon;

        return (
          <Card key={stat.title} className="@container/card">
            <CardHeader>
              <CardDescription className="flex items-center gap-2">
                <Icon className="size-4" />
                {stat.title}
              </CardDescription>

              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                {stat.value}
              </CardTitle>

              <CardAction>
                <Badge variant="outline">
                  <TrendIcon className="size-4" />
                  {stat.badge}
                </Badge>
              </CardAction>
            </CardHeader>

            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                {stat.description}
                <TrendIcon className="size-4" />
              </div>

              <div className="text-muted-foreground">{stat.footerText}</div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
