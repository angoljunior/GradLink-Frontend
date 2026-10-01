import { applicationStatuses as statusOptions } from '@/lib/application-statuses';
import { RecruitmentActionMenu, BulkRecruitmentToolbar } from './employer/RecruitmentControls';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { Link } from "react-router-dom";

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

const EmployerRecentApplications = ({ suppliedApplications, onStatusChanged }) => {
  const [loadedApplications, setApplications] = useState([]);
  const applications = suppliedApplications ?? loadedApplications;
  const [loading, setLoading] = useState(suppliedApplications === undefined);
  const [loadError, setLoadError] = useState("");
  const [selected, setSelected] = useState([]);
  const [jobFilter, setJobFilter] = useState('All');
  const jobs = [...new Map(applications.map(a=>[a.job_id, {id:a.job_id,title:a.role}])).values()];
  const changed = () => { setSelected([]); setOpenDetails(false); if (onStatusChanged) onStatusChanged(); else fetchRecentApplications(); };


  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);

  const fetchRecentApplications = useCallback(async (signal) => {
    try {
      setLoading(true);

      const response = await api.get("/employer/applications/recent/", { signal });

      const applicationsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setApplications(applicationsData);
      setLoadError("");
    } catch (error) {
      if (error.code !== "ERR_CANCELED") setLoadError("Unable to load applications. Please retry.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (suppliedApplications !== undefined) return;
    const controller = new AbortController();
    const timer = setTimeout(() => fetchRecentApplications(controller.signal), 0);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [suppliedApplications, fetchRecentApplications]);

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

      return matchesSearch && matchesStatus && (jobFilter === 'All' || application.job_id === Number(jobFilter));
    });
  }, [applications, searchTerm, statusFilter, jobFilter]);

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
      case "interview_invited":
      case "interview_scheduled":
      case "interviewed":
        return "bg-purple-100 text-purple-700";
      case "hired":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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

        <select aria-label="Filter job" className="mb-4 rounded border p-2" value={jobFilter} onChange={e=>{setJobFilter(e.target.value);setSelected([]);}}><option value="All">All jobs</option>{jobs.map(job=><option key={job.id} value={job.id}>{job.title}</option>)}</select>
        {suppliedApplications === undefined && <BulkRecruitmentToolbar applications={applications} selected={selected} jobs={jobs} jobFilter={jobFilter} onChanged={changed} />}
        {loadError ? <div role="alert" className="p-4 text-red-700">{loadError} <Button variant="outline" onClick={() => fetchRecentApplications()}>Retry</Button></div> : loading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading applications...
            </div>
          </div>
        ) : (
          <Table>
            <TableCaption>
              {suppliedApplications !== undefined ? <>Your five most recent applicants. <Link className="text-yellow-700 underline" to="/employer/applicants">View all applicants</Link></> : "Applications submitted to your posted jobs."}
            </TableCaption>

            <TableHeader>
              <TableRow>
                {suppliedApplications === undefined && <TableHead><Checkbox aria-label="Select all visible applicants" checked={filteredApplications.length>0 && filteredApplications.every(a=>selected.includes(a.id))} onCheckedChange={checked=>setSelected(checked?filteredApplications.map(a=>a.id):[])} /></TableHead>}<TableHead>Candidate</TableHead>
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
                    {suppliedApplications === undefined && <TableCell><Checkbox aria-label={`Select ${application.candidate_name}`} checked={selected.includes(application.id)} onCheckedChange={checked=>setSelected(prev=>checked?[...prev,application.id]:prev.filter(id=>id!==application.id))} /></TableCell>}
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
                        <Badge
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                            application.status,
                          )}`}
                        >
                          {application.status_display}
                        </Badge>

                      </div>
                      <RecruitmentActionMenu application={application} onChanged={changed} />
                      <p className="mt-1 text-xs">Match: {application.match?.score == null ? 'Not configured' : `${application.match.score}%`}</p>
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
                    colSpan={suppliedApplications === undefined ? 7 : 6}
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

                  <RecruitmentActionMenu application={selectedApplication} onChanged={changed} />
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

              <section className="space-y-3 rounded-xl border p-4"><h3 className="font-semibold">Matching evidence</h3><p>{selectedApplication.match?.note}</p>{selectedApplication.match?.breakdown?.map(part=><div key={part.criterion}><strong>{part.criterion}: {part.score}% (weight {part.weight})</strong><p className="whitespace-pre-wrap text-sm">{part.evidence}</p>{part.expected && <p className="text-sm">Expected: {part.expected.join(', ')}. Matched: {part.matched.join(', ') || 'None'}.</p>}</div>)}{selectedApplication.screening_responses?.map((answer,index)=><div key={index}><strong>{answer.question}</strong><p>{answer.answer || 'Not answered'}</p><small>Desired: {answer.desired_answer || 'Not scored'}</small></div>)}{selectedApplication.interview_details && <p>Interview: {new Date(selectedApplication.interview_details.interview_date).toLocaleString()} — {selectedApplication.interview_details.meeting_link || selectedApplication.interview_details.location}</p>}{selectedApplication.offer_details && <p className="whitespace-pre-wrap">Offer: {selectedApplication.offer_details.terms}</p>}</section>
              <section className="space-y-4 rounded-xl border p-4">
                <h3 className="font-semibold">Application details</h3>
                {[["education", "Education"], ["skills", "Skills"], ["work_experience", "Work Experience"], ["projects", "Projects"], ["certifications", "Certifications"]].map(([field, label]) => (
                  <div key={field}><h4 className="text-sm font-medium">{label}</h4><p className="whitespace-pre-wrap text-sm text-slate-600">{selectedApplication[field] || "Not provided"}</p></div>
                ))}
              </section>

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
