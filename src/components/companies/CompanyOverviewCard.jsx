import {
  Users,
  Building2,
  CalendarDays,
  Globe,
  Mail,
  Phone,
  BriefcaseBusiness,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const CompanyOverviewCard = ({ company, jobsCount = 0 }) => {
  if (!company) return null;

  const industry =
    company.industry_display || company.industry || "Industry not specified";

  const overviewItems = [
    {
      label: "Company Size",
      value: company.size || "Not specified",
      icon: Users,
    },
    {
      label: "Industry",
      value: industry,
      icon: Building2,
    },
    {
      label: "Open Jobs",
      value: `${jobsCount} ${jobsCount === 1 ? "job" : "jobs"}`,
      icon: BriefcaseBusiness,
    },
    {
      label: "Joined",
      value: company.created_at
        ? new Date(company.created_at).toLocaleDateString("en-GH", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Not specified",
      icon: CalendarDays,
    },
    {
      label: "Website",
      value: company.website || "Not provided",
      icon: Globe,
      link: company.website,
    },
    {
      label: "Email",
      value: company.contact_email || "Not provided",
      icon: Mail,
      link: company.contact_email ? `mailto:${company.contact_email}` : null,
    },
    {
      label: "Phone",
      value: company.contact_phone || "Not provided",
      icon: Phone,
      link: company.contact_phone ? `tel:${company.contact_phone}` : null,
    },
  ];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <h2 className="text-xl font-extrabold text-slate-950">
          Company Overview
        </h2>

        <div className="mt-7 space-y-6">
          {overviewItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-start gap-4">
                <Icon className="mt-1 h-5 w-5 text-yellow-600" />

                <div>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {item.label}
                  </h3>

                  {item.link ? (
                    <a
                      href={item.link}
                      target={
                        item.link.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.link.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="text-sm text-yellow-600 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-500">{item.value}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyOverviewCard;
