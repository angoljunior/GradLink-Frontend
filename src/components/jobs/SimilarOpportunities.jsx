import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import api from "@/api/axios";

const SimilarOpportunities = ({ currentJob }) => {
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSimilarJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/jobs/");

      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      const filteredJobs = jobsData
        .filter((job) => {
          const sameCompany =
            job.company?.id === currentJob.company?.id ||
            job.company === currentJob.company?.id;

          const sameCategory =
            job.category?.id === currentJob.category?.id ||
            job.category === currentJob.category?.id;

          return job.id !== currentJob.id && (sameCompany || sameCategory);
        })
        .slice(0, 3);

      setSimilarJobs(filteredJobs);
    } catch (error) {
      console.log("Failed to fetch similar jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentJob) {
      fetchSimilarJobs();
    }
  }, [currentJob?.id]);

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-7">
        <h2 className="text-xl font-extrabold text-slate-950">
          Similar Opportunities
        </h2>

        {loading && (
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading similar jobs...
          </div>
        )}

        {!loading && similarJobs.length === 0 && (
          <p className="mt-6 text-sm text-slate-500">
            No similar opportunities found.
          </p>
        )}

        {!loading && similarJobs.length > 0 && (
          <div className="mt-6 space-y-4">
            {similarJobs.map((job) => {
              const companyName = job.company?.name || "Unknown Company";

              return (
                <Link
                  key={job.id}
                  to={`/job/${job.id}`}
                  className="block rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
                >
                  <h3 className="font-semibold text-slate-950">{job.title}</h3>

                  <p className="mt-1 text-sm text-slate-500">{companyName}</p>

                  <Badge className="mt-3 rounded-md bg-slate-950 text-white hover:bg-slate-950">
                    {job.location}
                  </Badge>
                </Link>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimilarOpportunities;
