import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import JobDetailsHeader from "./JobDetailsHeader";
import JobInfoCards from "./JobInfoCards";
import JobDescriptionCard from "./JobDescriptionCard";
import CompanyInfoCard from "./CompanyInfoCard";
import SimilarOpportunities from "./SimilarOpportunities";

import api from "@/api/axios";

const JobDetailsPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/jobs/${id}/`);
      setJob(response.data);
    } catch (error) {
      console.log("Failed to fetch job details:", error);

      toast.error("Failed to load job details", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fa]">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading job details...
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f8fa]">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Job not found</h2>
          <p className="mt-2 text-sm text-slate-500">
            The job you are looking for may have been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f8fa]">
      <JobDetailsHeader job={job} />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_400px]">
          <main className="space-y-8">
            <JobInfoCards job={job} />
            <JobDescriptionCard job={job} />
          </main>

          <aside className="space-y-6">
            <CompanyInfoCard company={job.company} />
            <SimilarOpportunities currentJob={job} />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default JobDetailsPage;
