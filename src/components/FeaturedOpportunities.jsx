import { Link } from "react-router-dom";

import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  Bookmark,
  ChevronRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const opportunities = [
  {
    id: 1,
    companyId: 2,
    title: "Graduate Engineer – Network Operations",
    company: "MTN Ghana",
    location: "Accra",
    posted: "9 days ago",
    salary: "GHS 3,500 - 5,000",
    type: "Graduate",
    category: "Telecom",
  },
  {
    id: 2,
    companyId: 2,
    title: "Digital Marketing Graduate",
    company: "MTN Ghana",
    location: "Accra",
    posted: "9 days ago",
    salary: "GHS 2,800 - 4,000",
    type: "Graduate",
    category: "Telecom",
  },
  {
    id: 3,
    companyId: 1,
    title: "Graduate Banking Officer",
    company: "GCB Bank",
    location: "Accra",
    posted: "9 days ago",
    salary: "GHS 3,000 - 4,500",
    type: "Graduate",
    category: "Banking",
  },
  {
    id: 4,
    companyId: 1,
    title: "Software Developer – Digital Banking",
    company: "GCB Bank",
    location: "Accra",
    posted: "9 days ago",
    salary: "GHS 4,000 - 6,000",
    type: "Graduate",
    category: "Banking",
    extra: "Remote",
  },
  {
    id: 5,
    companyId: 5,
    title: "Mining Engineer Graduate",
    company: "Newmont Ghana Gold",
    location: "Tarkwa",
    posted: "9 days ago",
    salary: "GHS 5,000 - 8,000",
    type: "Graduate",
    category: "Mining",
  },
  {
    id: 6,
    companyId: 6,
    title: "Petroleum Engineer Graduate",
    company: "Tullow Oil Ghana",
    location: "Takoradi",
    posted: "9 days ago",
    salary: "GHS 6,000 - 9,000",
    type: "Graduate",
    category: "Oil & Gas",
  },
];

const FeaturedOpportunities = () => {
  return (
    <section className="bg-[#f6f8fa] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-9 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Featured Opportunities
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Hand-picked roles from top employers actively hiring.
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden items-center gap-2 rounded-lg bg-white shadow-sm sm:flex"
            asChild
          >
            <Link to="/jobs">
              View all jobs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((job) => (
            <Card
              key={job.id}
              className="rounded-xl border border-yellow-300 bg-[#fbfaf2] shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Company Icon */}
                  <Link
                    to={`/company/${job.companyId}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white transition hover:border-yellow-500"
                  >
                    <Building2 className="h-5 w-5 text-slate-500" />
                  </Link>

                  {/* Job Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div className="min-w-0">
                        <Link to={`/job/${job.id}`}>
                          <h3 className="truncate text-base font-semibold text-slate-900 transition hover:text-yellow-700">
                            {job.title}
                          </h3>
                        </Link>

                        <Link to={`/company/${job.companyId}`}>
                          <p className="mt-1 text-sm text-slate-500 transition hover:text-yellow-700 hover:underline">
                            {job.company}
                          </p>
                        </Link>
                      </div>

                      <button
                        type="button"
                        className="text-slate-500 transition hover:text-yellow-600"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          alert("Job saved!");
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Clickable job area */}
                    <Link to={`/job/${job.id}`} className="block">
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {job.posted}
                        </span>

                        <span className="flex items-center gap-1 font-medium text-emerald-600">
                          <Banknote className="h-3.5 w-3.5" />
                          {job.salary}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge className="rounded-md bg-slate-950 px-3 text-white hover:bg-slate-950">
                          {job.type}
                        </Badge>

                        <Badge
                          variant="outline"
                          className="rounded-md bg-white text-slate-600"
                        >
                          {job.category}
                        </Badge>

                        {job.extra && (
                          <Badge className="rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                            {job.extra}
                          </Badge>
                        )}
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile View Button */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="bg-white" asChild>
            <Link to="/jobs">
              View all jobs
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
