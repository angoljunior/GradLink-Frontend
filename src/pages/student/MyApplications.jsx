import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Search, Building2, Eye } from "lucide-react";
import { toast } from "sonner";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import api from "@/api/axios";

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchMyApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/student/applications/");

      const applicationsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setApplications(applicationsData);
    } catch (error) {
      console.log(
        "Failed to fetch student applications:",
        error.response?.data || error,
      );

      toast.error("Failed to load applications", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return applications.filter((application) => {
      const jobTitle = application.job_title?.toLowerCase() || "";
      const company = application.company_name?.toLowerCase() || "";
      const location = application.location?.toLowerCase() || "";

      const matchesSearch =
        jobTitle.includes(searchValue) ||
        company.includes(searchValue) ||
        location.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "submitted":
        return "bg-yellow-100 text-yellow-700";
      case "reviewed":
        return "bg-blue-100 text-blue-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "interview":
        return "bg-purple-100 text-purple-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    return new Date(dateValue).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Applications</h1>
            <p className="mt-2 text-muted-foreground">
              View and track all jobs you have applied for.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search job, company, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-md border pl-9 pr-3 text-sm outline-none focus:border-black sm:w-80"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
            >
              <option value="All">All Status</option>
              <option value="submitted">Submitted</option>
              <option value="reviewed">Reviewed</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="interview">Interview</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[240px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading your applications...
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableCaption>
                A list of all jobs you have applied for.
              </TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Applied</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredApplications.length > 0 ? (
                  filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        <Link
                          to={`/job/${application.job_id}`}
                          className="hover:text-yellow-700 hover:underline"
                        >
                          {application.job_title}
                        </Link>
                      </TableCell>

                      <TableCell>
                        <Link
                          to={`/company/${application.company_id}`}
                          className="flex items-center gap-2 hover:text-yellow-700 hover:underline"
                        >
                          {application.company_logo ? (
                            <img
                              src={application.company_logo}
                              alt={application.company_name}
                              className="h-7 w-7 rounded-md object-contain"
                            />
                          ) : (
                            <Building2 className="h-4 w-4 text-slate-500" />
                          )}

                          <span>{application.company_name}</span>
                        </Link>
                      </TableCell>

                      <TableCell>{application.location}</TableCell>

                      <TableCell>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            application.status,
                          )}`}
                        >
                          {application.status_display}
                        </span>
                      </TableCell>

                      <TableCell>
                        <div>
                          <p>{formatDate(application.applied_at)}</p>
                          <p className="text-xs text-muted-foreground">
                            {application.applied}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/job/${application.job_id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Job
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-muted-foreground"
                    >
                      No applications found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
