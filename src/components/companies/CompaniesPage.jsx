import React, { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import CompaniesHero from "./CompaniesHero";
import CompanyCard from "./CompanyCard";

import api from "@/api/axios";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getArrayData = (data) => {
    return Array.isArray(data) ? data : data.results || [];
  };

  const fetchCompaniesAndJobs = async () => {
    try {
      setLoading(true);

      const [companiesResponse, jobsResponse] = await Promise.all([
        api.get("/companies/"),
        api.get("/jobs/"),
      ]);

      const companiesData = getArrayData(companiesResponse.data);
      const jobsData = getArrayData(jobsResponse.data);

      const companiesWithJobs = companiesData.map((company) => {
        const companyJobs = jobsData.filter((job) => {
          const jobCompanyId = job.company?.id || job.company;
          return Number(jobCompanyId) === Number(company.id);
        });

        return {
          ...company,
          jobs: companyJobs,
          jobs_count: companyJobs.length,
        };
      });

      setCompanies(companiesWithJobs);
    } catch (error) {
      console.log(
        "Failed to fetch companies or jobs:",
        error.response?.data || error,
      );

      toast.error("Failed to load companies", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompaniesAndJobs();
  }, []);

  const filteredCompanies = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    if (!searchValue) return companies;

    return companies.filter((company) => {
      const name = company.name?.toLowerCase() || "";
      const location = company.location?.toLowerCase() || "";
      const industry = company.industry?.toLowerCase() || "";
      const industryDisplay = company.industry_display?.toLowerCase() || "";
      const description = company.description?.toLowerCase() || "";

      return (
        name.includes(searchValue) ||
        location.includes(searchValue) ||
        industry.includes(searchValue) ||
        industryDisplay.includes(searchValue) ||
        description.includes(searchValue)
      );
    });
  }, [companies, searchTerm]);

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <CompaniesHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Featured Companies
          </h2>

          {!loading && (
            <p className="text-sm text-slate-500">
              Showing {filteredCompanies.length} of {companies.length} companies
            </p>
          )}
        </div>

        {loading && (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading companies...
            </div>
          </div>
        )}

        {!loading && filteredCompanies.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              No companies found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try searching with a different company name, industry, or
              location.
            </p>
          </div>
        )}

        {!loading && filteredCompanies.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CompaniesPage;
