import { Building2, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyProfileHeader = ({ company }) => {
  if (!company) return null;

  const industry =
    company.industry_display || company.industry || "Industry not specified";

  return (
    <section className="relative">
      {/* Cover background */}
      <div className="h-72 bg-gradient-to-r from-yellow-100 via-slate-100 to-emerald-100" />

      {/* Floating company card */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="-mt-20 rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-28 w-28 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-md">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="h-16 w-16 object-contain"
                  />
                ) : (
                  <Building2 className="h-12 w-12 text-slate-500" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                    {company.name}
                  </h1>

                  {company.is_verified && (
                    <BadgeCheck className="h-6 w-6 text-blue-500" />
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {company.location || "Location not specified"}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4" />
                    {industry}
                  </span>
                </div>
              </div>
            </div>

            <Button className="h-11 rounded-lg bg-yellow-500 px-10 font-medium text-black hover:bg-yellow-600">
              Follow Company
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyProfileHeader;
