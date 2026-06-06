import { Search, MapPin, BriefcaseBusiness, Building2, GraduationCap, Star } from "lucide-react";
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

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-48px)] overflow-hidden bg-gradient-to-b from-[#faf9f4] via-[#f9faf7] to-[#eef8f2] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      
      {/* Soft dotted background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(15,23,42,0.08)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-20">
        
        {/* Badge */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="rounded-full border-yellow-400 bg-white/60 px-5 py-2 text-xs font-semibold text-yellow-600"
          >
            Ghana&apos;s #1 Graduate Recruitment Platform
          </Badge>
        </div>

        {/* Heading */}
        <div className="text-center mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Where Ambition Meets
          </h1>

          <h2 className="mt-2 text-5xl md:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-yellow-500 via-lime-500 to-emerald-500 bg-clip-text text-transparent">
            Opportunity
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-500 leading-relaxed">
            Connect with top employers in Ghana. Find graduate programs,
            internships, and national service opportunities tailored for you.
          </p>
        </div>

        {/* Search Bar */}
        <Card className="mt-10 max-w-4xl mx-auto border border-gray-200 bg-white/90 shadow-2xl shadow-slate-300/40 rounded-xl">
          <CardContent className="p-3">
            <div className="flex flex-col md:flex-row items-center gap-3">
              
              {/* Job Search */}
              <div className="flex items-center gap-3 w-full px-3">
                <Search className="w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Job title, skills, or company"
                  className="border-0 shadow-none focus-visible:ring-0 text-sm"
                />
              </div>

              <div className="hidden md:block h-8 w-px bg-gray-200" />

              {/* Location Search */}
              <div className="flex items-center gap-3 w-full px-3">
                <MapPin className="w-5 h-5 text-slate-500" />
                <Input
                  type="text"
                  placeholder="City or Region (e.g. Accra, Kumasi)"
                  className="border-0 shadow-none focus-visible:ring-0 text-sm"
                />
              </div>

              <Button className="w-full md:w-40 h-11 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
                Find Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <Card
                key={index}
                className="border-0 bg-transparent shadow-none text-center"
              >
                <CardContent className="p-0">
                  <div className="flex items-center justify-center gap-2">
                    <Icon className="w-4 h-4 text-slate-400" />
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