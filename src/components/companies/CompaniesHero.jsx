import { Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const CompaniesHero = ({ searchTerm, setSearchTerm }) => {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
        <div className="mb-5 flex justify-center">
          <Building2 className="h-10 w-10 text-slate-300" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Discover Top Employers
        </h1>

        <p className="mt-5 text-base text-slate-300 md:text-lg">
          Explore company profiles, culture, and available graduate
          opportunities across Ghana.
        </p>

        <div className="relative mx-auto mt-8 max-w-xl">
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search companies by name, industry, or location..."
            className="h-12 rounded-full border-none bg-white pl-12 pr-5 text-slate-900 focus-visible:ring-yellow-500"
          />
        </div>
      </div>
    </section>
  );
};

export default CompaniesHero;
