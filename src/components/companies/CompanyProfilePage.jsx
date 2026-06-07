import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import CompanyProfileHeader from "./CompanyProfileHeader";
import CompanyOverviewCard from "./CompanyOverviewCard";
import CompanyOpenRoles from "./CompanyOpenRoles";

import api from "@/api/axios";

const CompanyProfilePage = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanyProfile = async () => {
    try {
      setLoading(true);

      const companyResponse = await api.get(`/companies/${id}/`);
      setCompany(companyResponse.data);

      const jobsResponse = await api.get("/jobs/");

      const jobsData = Array.isArray(jobsResponse.data)
        ? jobsResponse.data
        : jobsResponse.data.results || [];

      const filteredJobs = jobsData.filter((job) => {
        const jobCompanyId = job.company?.id || job.company;
        return Number(jobCompanyId) === Number(id);
      });

      setCompanyJobs(filteredJobs);
    } catch (error) {
      console.log(
        "Failed to fetch company profile:",
        error.response?.data || error,
      );

      toast.error("Failed to load company profile", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8fa]">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading company profile...
        </div>
      </main>
    );
  }

  if (!company) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f8fa]">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Company not found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            The company you are looking for may have been removed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f8fa]">
      <CompanyProfileHeader company={company} />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px]">
          {/* Left side */}
          <main>
            <section className="mb-10">
              <h2 className="text-2xl font-extrabold text-slate-950">
                About Us
              </h2>

              <p className="mt-6 text-base leading-relaxed text-slate-500 md:text-lg">
                {company.description || "No company description available."}
              </p>
            </section>

            <CompanyOpenRoles jobs={companyJobs} company={company} />
          </main>

          {/* Right side */}
          <aside>
            <CompanyOverviewCard
              company={company}
              jobsCount={companyJobs.length}
            />
          </aside>
        </div>
      </section>
    </main>
  );
};

export default CompanyProfilePage;
