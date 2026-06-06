import {
  Users,
  Building2,
  CalendarDays,
  Globe,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const overviewItems = [
  {
    label: "Company Size",
    value: "Enterprise",
    icon: Users,
  },
  {
    label: "Industry",
    value: "Telecom",
    icon: Building2,
  },
  {
    label: "Founded",
    value: "1994",
    icon: CalendarDays,
  },
  {
    label: "Website",
    value: "mtn.com.gh",
    icon: Globe,
    link: "https://mtn.com.gh",
  },
];

const CompanyOverviewCard = () => {
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
                      target="_blank"
                      rel="noreferrer"
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