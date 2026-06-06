import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  Bookmark,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import api from "@/api/axios";

const FeaturedOpportunities = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/jobs/");

      // Handles both normal arrays and DRF pagination
      const jobsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setOpportunities(jobsData.slice(0, 6));
    } catch (error) {
      console.log("Failed to fetch jobs:", error);

      toast.error("Failed to load jobs", {
        description: "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const formatSalary = (min, max) => {
    if (min && max) {
      return `GHS ${Number(min).toLocaleString()} - ${Number(
        max,
      ).toLocaleString()}`;
    }

    if (min) {
      return `From GHS ${Number(min).toLocaleString()}`;
    }

    if (max) {
      return `Up to GHS ${Number(max).toLocaleString()}`;
    }

    return "Not specified";
  };

  const formatPostedDate = (dateValue) => {
    if (!dateValue) return "Recently posted";

    const postedDate = new Date(dateValue);
    const today = new Date();

    const differenceInTime = today - postedDate;
    const differenceInDays = Math.floor(
      differenceInTime / (1000 * 60 * 60 * 24),
    );

    if (differenceInDays <= 0) return "Today";
    if (differenceInDays === 1) return "1 day ago";
    return `${differenceInDays} days ago`;
  };

  const handleSaveJob = async () => {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (!token) {
      toast.error("Login required", {
        description: "Please log in before saving jobs.",
      });
      return;
    }

    if (role !== "student") {
      toast.error("Student account required", {
        description: "Only students can save jobs.",
      });
      return;
    }

    try {
      setSavingJob(true);

      await api.post("/saved-jobs/", {
        job: job.id,
      });

      toast.success("Job saved", {
        description: "This job has been added to your saved jobs.",
      });
    } catch (error) {
      console.log("Save job error:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.job?.[0] ||
        "Unable to save this job.";

      toast.error("Unable to save job", {
        description: errorMessage,
      });
    } finally {
      setSavingJob(false);
    }
  };

  return (
    <section className="bg-[#f6f8fa] py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-9 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Featured Opportunities
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Hand-picked roles from top employers actively hiring.
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden items-center gap-2 rounded-lg bg-white shadow-sm sm:flex"
            asChild
          >
            <Link to="/jobs">
              View all jobs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading featured jobs...
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && opportunities.length === 0 && (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No featured jobs available
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Please check back later for new opportunities.
            </p>
          </div>
        )}

        {/* Job Cards */}
        {!loading && opportunities.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {opportunities.map((job) => {
              const companyId = job.company?.id || job.company;
              const companyName = job.company?.name || "Unknown Company";
              const categoryName = job.category?.name || "General";

              return (
                <Card
                  key={job.id}
                  className="rounded-xl border border-yellow-300 bg-[#fbfaf2] shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* Company Icon */}
                      <Link
                        to={`/company/${companyId}`}
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border bg-white transition hover:border-yellow-500"
                      >
                        {job.company?.logo ? (
                          <img
                            src={job.company.logo}
                            alt={companyName}
                            className="h-8 w-8 object-contain"
                          />
                        ) : (
                          <Building2 className="h-5 w-5 text-slate-500" />
                        )}
                      </Link>

                      {/* Job Info */}
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-3">
                          <div className="min-w-0">
                            <Link to={`/jobs/${job.id}`}>
                              <h3 className="truncate text-base font-semibold text-slate-900 transition hover:text-yellow-700">
                                {job.title}
                              </h3>
                            </Link>

                            <Link to={`/company/${companyId}`}>
                              <p className="mt-1 text-sm text-slate-500 transition hover:text-yellow-700 hover:underline">
                                {companyName}
                              </p>
                            </Link>
                          </div>

                          <button
                            type="button"
                            className="text-slate-500 transition hover:text-yellow-600"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleSaveJob(job.id);
                            }}
                          >
                            <Bookmark className="h-4 w-4" />
                          </button>
                        </div>

                        <Link to={`/jobs/${job.id}`} className="block">
                          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </span>

                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {formatPostedDate(job.posted_at)}
                            </span>

                            <span className="flex items-center gap-1 font-medium text-emerald-600">
                              <Banknote className="h-3.5 w-3.5" />
                              {formatSalary(job.salary_min, job.salary_max)}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge className="rounded-md bg-slate-950 px-3 text-white hover:bg-slate-950">
                              {job.job_type_display || job.job_type}
                            </Badge>

                            <Badge
                              variant="outline"
                              className="rounded-md bg-white text-slate-600"
                            >
                              {categoryName}
                            </Badge>

                            {job.work_mode && (
                              <Badge className="rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                {job.work_mode_display || job.work_mode}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Mobile View Button */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Button variant="outline" className="bg-white" asChild>
            <Link to="/jobs">
              View all jobs
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
