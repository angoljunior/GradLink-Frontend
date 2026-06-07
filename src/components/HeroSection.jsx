import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Building2,
  GraduationCap,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    value: "20+",
    label: "Active Jobs",
    icon: BriefcaseBusiness,
  },
  {
    value: "12+",
    label: "Top Companies",
    icon: Building2,
  },
  {
    value: "8+",
    label: "Graduates",
    icon: GraduationCap,
  },
  {
    value: "25%",
    label: "Placement Rate",
    icon: Star,
  },
];

const HeroSection = ({
  jobSearch,
  setJobSearch,
  locationSearch,
  setLocationSearch,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const employersSection = document.getElementById("top-employers");

    if (employersSection) {
      employersSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-48px)] overflow-hidden bg-gradient-to-b from-[#faf9f4] via-[#f9faf7] to-[#eef8f2] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28">
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="rounded-full border-yellow-400 bg-white/60 px-5 py-2 text-xs font-semibold text-yellow-600"
          >
            Ghana&apos;s #1 Graduate Recruitment Platform
          </Badge>
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-slate-950 md:text-7xl">
            Where Ambition Meets
          </h1>

          <h2 className="mt-2 bg-gradient-to-r from-yellow-500 via-lime-500 to-emerald-500 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-7xl">
            Opportunity
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
            Connect with top employers in Ghana. Find graduate programs,
            internships, and national service opportunities tailored for you.
          </p>
        </div>

        <Card className="mx-auto mt-10 max-w-4xl rounded-xl border border-gray-200 bg-white/90 shadow-2xl shadow-slate-300/40">
          <CardContent className="p-3">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-3 md:flex-row"
            >
              <div className="flex w-full items-center gap-3 px-3">
                <Search className="h-5 w-5 text-slate-500" />
                <Input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Job title, skills, company, or industry"
                  className="border-0 text-sm shadow-none focus-visible:ring-0"
                />
              </div>

              <div className="hidden h-8 w-px bg-gray-200 md:block" />

              <div className="flex w-full items-center gap-3 px-3">
                <MapPin className="h-5 w-5 text-slate-500" />
                <Input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="City or Region e.g. Accra, Kumasi"
                  className="border-0 text-sm shadow-none focus-visible:ring-0"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-lg bg-yellow-500 font-semibold text-black hover:bg-yellow-600 md:w-40"
              >
                Find Jobs
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="border-0 bg-transparent text-center shadow-none"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <h3 className="text-3xl font-extrabold text-slate-950">
                      {item.value}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500">{item.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
