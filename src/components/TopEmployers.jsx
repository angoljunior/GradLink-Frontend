import { Link } from "react-router-dom";

import {
  Building2,
  MapPin,
  Users,
  BriefcaseBusiness,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const employers = [
  {
    id: 1,
    name: "GCB Bank",
    location: "Accra",
    description:
      "GCB Bank is the largest bank in Ghana by branch network, providing retail and corporate banking services.",
    size: "Large",
    jobs: [
      {
        id: 101,
        title: "Graduate Trainee Banker",
      },
      {
        id: 102,
        title: "Customer Service Officer",
      },
      {
        id: 103,
        title: "Risk Analyst Intern",
      },
    ],
  },
  {
    id: 2,
    name: "MTN Ghana",
    location: "Accra",
    description:
      "MTN Ghana is a leading telecommunications company providing mobile and internet services across Ghana.",
    size: "Enterprise",
    jobs: [
      {
        id: 201,
        title: "Graduate Engineer - Network Operations",
      },
      {
        id: 202,
        title: "Frontend Developer Intern",
      },
      {
        id: 203,
        title: "Customer Experience Associate",
      },
    ],
  },
  {
    id: 3,
    name: "Stanbic Bank Ghana",
    location: "Accra",
    description:
      "Stanbic Bank Ghana is a subsidiary of Standard Bank Group, one of Africa's largest banks.",
    size: "Large",
    jobs: [
      {
        id: 301,
        title: "Data Analyst Intern",
      },
      {
        id: 302,
        title: "Finance Graduate Trainee",
      },
    ],
  },
  {
    id: 4,
    name: "Ghana Ports and Harbours Authority",
    location: "Tema",
    description:
      "GPHA manages and operates the Tema and Takoradi ports, the main gateways for Ghana's imports and exports.",
    size: "Large",
    jobs: [
      {
        id: 401,
        title: "Electrical Maintenance Intern",
      },
      {
        id: 402,
        title: "Operations Graduate Trainee",
      },
    ],
  },
];

const TopEmployers = () => {
  return (
    <section className="bg-[#f6f8fa] py-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-9 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Top Employers in Ghana
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Discover companies shaping the future and hiring graduates.
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden items-center gap-2 rounded-lg bg-white shadow-sm sm:flex"
            asChild
          >
            <Link to="/companies">
              Explore companies
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {employers.map((company) => (
            <Card
              key={company.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Clickable company area */}
              <Link to={`/company/${company.id}`} className="block">
                <div className="relative h-20 bg-slate-100">
                  <div className="absolute bottom-[-26px] left-5 flex h-14 w-14 items-center justify-center rounded-lg border bg-white shadow-sm">
                    <Building2 className="h-6 w-6 text-slate-500" />
                  </div>
                </div>

                <CardContent className="px-5 pb-5 pt-10">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold leading-tight text-slate-900 hover:text-yellow-600">
                      {company.name}
                    </h3>

                    <Badge className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 hover:bg-blue-50">
                      Verified
                    </Badge>
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{company.location}</span>
                  </div>

                  <p className="mt-4 min-h-[48px] text-sm leading-relaxed text-slate-500">
                    {company.description}
                  </p>

                  <div className="my-5 h-px bg-slate-200" />

                  <div className="flex items-center gap-5 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Users className="h-4 w-4" />
                      <span>{company.size}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium text-yellow-600">
                      <BriefcaseBusiness className="h-4 w-4" />
                      <span>{company.jobs.length} jobs</span>
                    </div>
                  </div>
                </CardContent>
              </Link>

              {/* Job links */}
              <div className="border-t px-5 pb-5 pt-4">
                <h4 className="mb-3 text-sm font-semibold text-slate-900">
                  Open Jobs
                </h4>

                <div className="space-y-2">
                  {company.jobs.slice(0, 2).map((job) => (
                    <Link
                      key={job.id}
                      to={`/job/${job.id}`}
                      className="block rounded-md border bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-yellow-400 hover:bg-yellow-50 hover:text-yellow-700"
                    >
                      {job.title}
                    </Link>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Mobile button */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="bg-white" asChild>
            <Link to="/companies">
              Explore companies
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopEmployers;
