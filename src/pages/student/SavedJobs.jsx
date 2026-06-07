import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Loader2,
  Search,
  Building2,
  MapPin,
  BriefcaseBusiness,
  Trash2,
  Eye,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/api/axios";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/saved-jobs");

      const savedJobsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setSavedJobs(savedJobsData);
    } catch (error) {
      console.log("Failed to fetch saved jobs:", error.response?.data || error);

      toast.error("Failed to load saved jobs", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const filteredSavedJobs = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    if (!searchValue) return savedJobs;

    return savedJobs.filter((item) => {
      const title = item.job_title?.toLowerCase() || "";
      const company = item.company_name?.toLowerCase() || "";
      const location = item.location?.toLowerCase() || "";
      const category = item.category_name?.toLowerCase() || "";

      return (
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        location.includes(searchValue) ||
        category.includes(searchValue)
      );
    });
  }, [savedJobs, searchTerm]);

  const handleRemoveSavedJob = async (savedJobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this saved job?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(savedJobId);

      await api.delete(`/student/saved-jobs/${savedJobId}/delete/`);

      setSavedJobs((prev) => prev.filter((item) => item.id !== savedJobId));

      toast.success("Saved job removed", {
        description: "The job has been removed from your saved jobs.",
      });
    } catch (error) {
      console.log("Failed to remove saved job:", error.response?.data || error);

      toast.error("Unable to remove saved job", {
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatSalary = (min, max) => {
    if (min && max) {
      return `GHS ${Number(min).toLocaleString()} - ${Number(
        max,
      ).toLocaleString()}`;
    }

    if (min) return `From GHS ${Number(min).toLocaleString()}`;
    if (max) return `Up to GHS ${Number(max).toLocaleString()}`;

    return "Not specified";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not specified";

    return new Date(dateValue).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">Saved Jobs</h1>
            <p className="mt-2 text-muted-foreground">
              View and manage jobs you saved for later.
            </p>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search saved jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-md border pl-9 pr-3 text-sm outline-none focus:border-black sm:w-80"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading saved jobs...
            </div>
          </div>
        ) : filteredSavedJobs.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No saved jobs found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Jobs you save will appear here.
            </p>

            <Button
              asChild
              className="mt-5 bg-yellow-500 text-black hover:bg-yellow-600"
            >
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSavedJobs.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <Link
                    to={`/company/${item.company_id}`}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-slate-50"
                  >
                    {item.company_logo ? (
                      <img
                        src={item.company_logo}
                        alt={item.company_name}
                        className="h-9 w-9 object-contain"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-slate-500" />
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link to={`/job/${item.job_id}`}>
                      <h2 className="line-clamp-2 text-base font-semibold text-slate-950 hover:text-yellow-700 hover:underline">
                        {item.job_title}
                      </h2>
                    </Link>

                    <Link to={`/company/${item.company_id}`}>
                      <p className="mt-1 text-sm text-slate-500 hover:text-yellow-700 hover:underline">
                        {item.company_name}
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-600" />
                    <span>{item.location || "Location not specified"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-yellow-600" />
                    <span>
                      {item.job_type || "Job Type"} •{" "}
                      {item.work_mode || "Work Mode"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-yellow-600" />
                    <span>
                      {formatSalary(item.salary_min, item.salary_max)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge className="rounded-full bg-slate-900 text-white hover:bg-slate-900">
                    {item.category_name || "General"}
                  </Badge>

                  {item.is_active ? (
                    <Badge className="rounded-full bg-green-100 text-green-700 hover:bg-green-100">
                      Active
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-red-100 text-red-700 hover:bg-red-100">
                      Closed
                    </Badge>
                  )}
                </div>

                <div className="mt-5 border-t pt-4 text-xs text-muted-foreground">
                  <p>Deadline: {formatDate(item.deadline)}</p>
                  <p>Saved: {formatDate(item.saved_at)}</p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/job/${item.job_id}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Job
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveSavedJob(item.id)}
                    disabled={deletingId === item.id}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="mr-2 h-4 w-4" />
                    )}
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
