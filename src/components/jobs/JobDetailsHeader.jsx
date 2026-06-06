import {
  Building2,
  MapPin,
  Clock,
  Bookmark,
  Share2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const JobDetailsHeader = () => {
  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm">
            <Building2 className="h-10 w-10 text-slate-500" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
              Graduate Engineer – Network Operations
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="flex items-center gap-1.5 text-yellow-600 font-medium">
                <Building2 className="h-4 w-4" />
                MTN Ghana
              </span>

              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="h-4 w-4" />
                Accra
              </span>

              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-4 w-4" />
                Posted 10 days ago
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-lg bg-white"
          >
            <Bookmark className="h-5 w-5 text-slate-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-lg bg-white"
          >
            <Share2 className="h-5 w-5 text-slate-600" />
          </Button>

          <Button className="h-11 px-10 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsHeader;