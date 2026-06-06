import { Building2, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyProfileHeader = () => {
  return (
    <section className="relative">
      {/* Cover background */}
      <div className="h-72 bg-gradient-to-r from-yellow-100 via-slate-100 to-emerald-100" />

      {/* Floating company card */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="-mt-20 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="h-28 w-28 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-md">
                <Building2 className="h-12 w-12 text-slate-500" />
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                    MTN Ghana
                  </h1>

                  <BadgeCheck className="h-6 w-6 text-blue-500" />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    Accra
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    Telecom
                  </span>
                </div>
              </div>
            </div>

            <Button className="h-11 px-10 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium">
              Follow Company
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfileHeader;