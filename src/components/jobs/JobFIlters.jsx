import { Search, MapPin, ChevronUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const jobTypes = [
  "Graduate",
  "Internship",
  "National Service (NSS)",
  "Entry Level",
];

const industries = [
  "Technology",
  "Finance",
  "Healthcare",
  "Engineering",
  "Marketing",
  "Consulting",
];

const JobFilters = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold text-slate-900">Filter Jobs</h2>

        {/* Search Inputs */}
        <div className="mt-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Job title, keywords, or company"
              className="h-11 pl-10 rounded-lg bg-white"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="City, region, or remote"
              className="h-11 pl-10 rounded-lg bg-white"
            />
          </div>

          <Button className="w-full h-11 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg">
            Find Jobs
          </Button>
        </div>

        {/* Job Type */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Job Type</h3>
            <ChevronUp className="h-4 w-4 text-slate-500" />
          </div>

          <div className="mt-5 space-y-3">
            {jobTypes.map((type) => (
              <label
                key={type}
                className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-yellow-400 accent-yellow-500"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator className="my-6" />

        {/* Industry */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Industry</h3>
            <ChevronUp className="h-4 w-4 text-slate-500" />
          </div>

          <div className="mt-5 space-y-3">
            {industries.map((industry) => (
              <label
                key={industry}
                className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-yellow-400 accent-yellow-500"
                />
                <span>{industry}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobFilters;