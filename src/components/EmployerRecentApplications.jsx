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
  Eye,
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
import MessageCandidateDialog from "./employer/MessageCandidateDialog";

const statusOptions = [
  { value: "submitted", label: "Submitted" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const EmployerRecentApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);

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
      const email = application.candidate_email?.toLowerCase() || "";

      const matchesSearch =
        candidate.includes(searchValue) ||
        role.includes(searchValue) ||
        university.includes(searchValue) ||
        programme.includes(searchValue) ||
        email.includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setOpenDetails(true);
  };

  const handleStatusUpdate = async (application, newStatus) => {
    if (application.status === newStatus) return;

    try {
      setUpdatingStatusId(application.id);

      const response = await api.patch(
        `/employer/applications/${application.id}/status/`,
        {
          status: newStatus,
        },
      );

      const updatedStatusLabel =
        statusOptions.find((item) => item.value === newStatus)?.label ||
        newStatus;

      setApplications((prevApplications) =>
        prevApplications.map((item) =>
          item.id === application.id
            ? {
                ...item,
                status: newStatus,
                status_display: updatedStatusLabel,
              }
            : item,
        ),
      );

      if (selectedApplication?.id === application.id) {
        setSelectedApplication((prev) => ({
          ...prev,
          status: newStatus,
          status_display: updatedStatusLabel,
        }));
      }

      toast.success("Application status updated", {
        description:
          response.data?.message ||
          `The applicant has been marked as ${updatedStatusLabel}.`,
      });
    } catch (error) {
      console.log("Status update failed:", error.response?.data || error);

      toast.error("Failed to update status", {
        description:
          error.response?.data?.detail ||
          "Please try again. The applicant was not notified.",
      });
    } finally {
      setUpdatingStatusId(null);
    }
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
    return decodeURIComponent(fileUrl.split("/").pop());
  };

  const DocumentCard = ({ label, fileUrl }) => {
    if (!fileUrl) {
      return (
        <div className="rounded-xl border bg-slate-50 p-4 text-sm text-muted-foreground">
          No {label.toLowerCase()} uploaded.
        </div>
      );
    }

    return (
      <a
        href={fileUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between rounded-xl border bg-white p-4 text-sm transition hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-yellow-600" />

          <div>
            <p className="font-medium text-slate-900">{label}</p>
            <p className="text-xs text-slate-500">{getFileName(fileUrl)}</p>
          </div>
        </div>

        <Download className="h-4 w-4 text-slate-500" />
      </a>
    );
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
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
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
                <TableHead>Applied</TableHead>
                <TableHead className="text-right">Action</TableHead>
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
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            application.status,
                          )}`}
                        >
                          {application.status_display}
                        </span>

                        {updatingStatusId === application.id && (
                          <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
                        )}
                      </div>

                      <select
                        value={application.status}
                        disabled={updatingStatusId === application.id}
                        onChange={(e) =>
                          handleStatusUpdate(application, e.target.value)
                        }
                        className="mt-2 h-8 rounded-md border px-2 text-xs outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {statusOptions.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </TableCell>

                    <TableCell>{application.applied}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewApplication(application)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>

                        <MessageCandidateDialog application={application} />
                      </div>
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
        )}
      </div>

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
              <div className="rounded-xl border bg-slate-50 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {selectedApplication.candidate_name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Applied {selectedApplication.applied}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      selectedApplication.status,
                    )}`}
                  >
                    {selectedApplication.status_display}
                  </span>
                </div>

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

                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Programme:</span>{" "}
                    {selectedApplication.programme || "Not provided"}
                  </div>

                  {selectedApplication.phone && (
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {selectedApplication.phone}
                    </div>
                  )}

                  {selectedApplication.portfolio && (
                    <div className="text-sm text-slate-600">
                      <span className="font-medium">Portfolio:</span>{" "}
                      <a
                        href={selectedApplication.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="text-yellow-700 hover:underline"
                      >
                        View Portfolio
                      </a>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Update Application Status
                  </label>

                  <select
                    value={selectedApplication.status}
                    disabled={updatingStatusId === selectedApplication.id}
                    onChange={(e) =>
                      handleStatusUpdate(selectedApplication, e.target.value)
                    }
                    className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Updating the status will notify the student through the
                    platform and email if your backend email service is enabled.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Submitted Documents
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <DocumentCard
                    label="CV / Resume"
                    fileUrl={selectedApplication.cv}
                  />

                  <DocumentCard
                    label="Cover Letter"
                    fileUrl={selectedApplication.cover_letter}
                  />

                  <DocumentCard
                    label="Transcript"
                    fileUrl={selectedApplication.transcript}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Send a direct message to this applicant about their
                  application.
                </p>

                <MessageCandidateDialog application={selectedApplication} />
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
