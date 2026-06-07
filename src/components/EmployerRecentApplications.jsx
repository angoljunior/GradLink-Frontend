import React, { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Search,
  FileText,
  Download,
  Mail,
  GraduationCap,
  BriefcaseBusiness,
  X,
} from "lucide-react";
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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import api from "@/api/axios";

const EmployerRecentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const fetchRecentApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/employer/applications/recent/");

      const applicationsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setApplications(applicationsData);
    } catch (error) {
      console.log(
        "Failed to fetch employer applications:",
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
    fetchRecentApplications();
  }, []);

  const filteredApplications = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return applications.filter((application) => {
      const candidate = application.candidate_name?.toLowerCase() || "";
      const role = application.role?.toLowerCase() || "";
      const university = application.university?.toLowerCase() || "";
      const programme = application.programme?.toLowerCase() || "";

      const matchesSearch =
        candidate.includes(searchValue) ||
        role.includes(searchValue) ||
        university.includes(searchValue) ||
        programme.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setOpenDetails(true);
  };

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

  const getFileName = (fileUrl) => {
    if (!fileUrl) return "";
    return fileUrl.split("/").pop();
  };

  return (
    <>
      <div className="mx-4 rounded-xl border bg-white p-5 shadow-sm lg:mx-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <p className="text-sm text-muted-foreground">
              View applications submitted to jobs posted by your company.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <input
                type="text"
                placeholder="Search candidate, role, university..."
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
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading applications...
            </div>
          </div>
        ) : (
          <Table>
            <TableCaption>
              Recent applications submitted to your posted jobs.
            </TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Applied</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <button
                        type="button"
                        onClick={() => handleViewApplication(application)}
                        className="text-left hover:text-yellow-700 hover:underline"
                      >
                        <p className="font-medium">
                          {application.candidate_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {application.candidate_email}
                        </p>
                      </button>
                    </TableCell>

                    <TableCell>{application.role}</TableCell>

                    <TableCell>
                      <div>
                        <p>{application.university}</p>
                        <p className="text-xs text-muted-foreground">
                          {application.programme}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          application.status,
                        )}`}
                      >
                        {application.status_display}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      {application.applied}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No applications found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Applicant Details Dialog */}
      <Dialog open={openDetails} onOpenChange={setOpenDetails}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Applicant Details</DialogTitle>
            <DialogDescription>
              View candidate information, cover letter, CV, and transcript.
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Candidate Summary */}
              <div className="rounded-xl border bg-slate-50 p-5">
                <h3 className="text-lg font-semibold text-slate-900">
                  {selectedApplication.candidate_name}
                </h3>

                <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-yellow-600" />
                    <span>{selectedApplication.candidate_email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <BriefcaseBusiness className="h-4 w-4 text-yellow-600" />
                    <span>{selectedApplication.role}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-yellow-600" />
                    <span>{selectedApplication.university}</span>
                  </div>

                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        selectedApplication.status,
                      )}`}
                    >
                      {selectedApplication.status_display}
                    </span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <FileText className="h-4 w-4 text-yellow-600" />
                  Cover Letter
                </h3>

                <div className="max-h-60 overflow-y-auto rounded-xl border bg-white p-4 text-sm leading-7 text-slate-600">
                  {selectedApplication.cover_letter ? (
                    <p className="whitespace-pre-line">
                      {selectedApplication.cover_letter}
                    </p>
                  ) : (
                    <p className="text-muted-foreground">
                      No cover letter submitted.
                    </p>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Submitted Documents
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedApplication.cv ? (
                    <a
                      href={selectedApplication.cv}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-slate-900">
                            CV / Resume
                          </p>
                          <p className="text-xs text-slate-500">
                            {getFileName(selectedApplication.cv)}
                          </p>
                        </div>
                      </div>

                      <Download className="h-4 w-4 text-slate-500" />
                    </a>
                  ) : (
                    <div className="rounded-xl border bg-slate-50 p-4 text-sm text-muted-foreground">
                      No CV uploaded.
                    </div>
                  )}

                  {selectedApplication.transcript ? (
                    <a
                      href={selectedApplication.transcript}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm transition hover:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium text-slate-900">
                            Transcript
                          </p>
                          <p className="text-xs text-slate-500">
                            {getFileName(selectedApplication.transcript)}
                          </p>
                        </div>
                      </div>

                      <Download className="h-4 w-4 text-slate-500" />
                    </a>
                  ) : (
                    <div className="rounded-xl border bg-slate-50 p-4 text-sm text-muted-foreground">
                      No transcript uploaded.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDetails(false)}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployerRecentApplications;
