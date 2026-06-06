import { Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const CompaniesHero = () => {
  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 text-center">
        <div className="flex justify-center mb-5">
          <Building2 className="h-10 w-10 text-slate-300" />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Discover Top Employers
        </h1>

        <p className="mt-5 text-base md:text-lg text-slate-300">
          Explore company profiles, culture, and available graduate
          opportunities across Ghana.
        </p>

        <div className="mt-8 max-w-xl mx-auto relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

          <Input
            type="text"
            placeholder="Search companies by name or industry..."
            className="h-12 rounded-full bg-white text-slate-900 pl-12 pr-5 border-none focus-visible:ring-yellow-500"
          />
        </div>
      </div>
    </section>
  );
};

export default CompaniesHero;