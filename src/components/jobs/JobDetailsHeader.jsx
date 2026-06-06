import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import {
  Building2,
  MapPin,
  Clock,
  Bookmark,
  Share2,
  Check,
  Copy,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";

import api from "@/api/axios";

const JobDetailsHeader = ({ job }) => {
  const [copied, setCopied] = useState(false);
  const [savingJob, setSavingJob] = useState(false);
  const [applying, setApplying] = useState(false);
  const [openApplyDialog, setOpenApplyDialog] = useState(false);

  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolio: "",
    coverLetter: "",
    cv: null,
    transcript: null,
  });

  const jobShareLink = window.location.href;

  const company = job?.company;
  const companyName = company?.name || "Company not available";
  const companyId = company?.id;
  const companyLogo = company?.logo;

  const formatPostedDate = (dateValue) => {
    if (!dateValue) return "Recently posted";

    const postedDate = new Date(dateValue);
    const today = new Date();

    const diffTime = today - postedDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Posted today";
    if (diffDays === 1) return "Posted 1 day ago";

    return `Posted ${diffDays} days ago`;
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: job?.title || "Job Opportunity",
      text: `Check out this job opportunity on GradLink: ${
        job?.title || "Job Opportunity"
      }`,
      url: jobShareLink,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(jobShareLink);
        setCopied(true);
        toast.success("Job link copied");

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }
    } catch (error) {
      console.log("Sharing cancelled or failed:", error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(jobShareLink);
      setCopied(true);

      toast.success("Job link copied", {
        description: "You can now share this job with others.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy link:", error);

      toast.error("Failed to copy link", {
        description: "Please try again.",
      });
    }
  };

  const handleSaveJob = async () => {
    try {
      setSavingJob(true);

      await api.post("/saved-jobs/", {
        job: job.id,
      });

      toast.success("Job saved", {
        description: "This job has been added to your saved jobs.",
      });
    } catch (error) {
      console.log("Failed to save job:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        "You may need to log in as a student before saving jobs.";

      toast.error("Unable to save job", {
        description: errorMessage,
      });
    } finally {
      setSavingJob(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setApplicationData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      return;
    }

    setApplicationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();

    if (!applicationData.coverLetter) {
      toast.warning("Cover letter required", {
        description: "Please write a short cover letter before submitting.",
      });
      return;
    }

    if (!applicationData.cv) {
      toast.warning("CV required", {
        description: "Please upload your CV/resume.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("job", job.id);
    formData.append("cover_letter", applicationData.coverLetter);

    if (applicationData.cv) {
      formData.append("cv", applicationData.cv);
    }

    if (applicationData.transcript) {
      formData.append("transcript", applicationData.transcript);
    }

    /*
      Your JobApplication model only has:
      job, cover_letter, cv, transcript

      fullName, email, phone, and portfolio are useful on the frontend,
      but unless your backend serializer accepts them, don't send them.
    */

    try {
      setApplying(true);

      const response = await api.post("/applications/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Application submitted", {
        description:
          response.data?.message ||
          "Your application has been submitted successfully.",
      });

      setApplicationData({
        fullName: "",
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: "",
        cv: null,
        transcript: null,
      });

      setOpenApplyDialog(false);
    } catch (error) {
      console.log("Application failed:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.non_field_errors?.[0] ||
        error.response?.data?.job?.[0] ||
        error.response?.data?.cover_letter?.[0] ||
        "Failed to submit application. You may have already applied for this job.";

      toast.error("Application failed", {
        description: errorMessage,
      });
    } finally {
      setApplying(false);
    }
  };

  if (!job) return null;

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-6">
          <Link
            to={companyId ? `/company/${companyId}` : "#"}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-yellow-500"
          >
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="h-12 w-12 object-contain"
              />
            ) : (
              <Building2 className="h-10 w-10 text-slate-500" />
            )}
          </Link>

          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 md:text-4xl">
              {job.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm md:text-base">
              <Link
                to={companyId ? `/company/${companyId}` : "#"}
                className="flex items-center gap-1.5 font-medium text-yellow-600 hover:underline"
              >
                <Building2 className="h-4 w-4" />
                {companyName}
              </Link>

              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="h-4 w-4" />
                {job.location || "Location not specified"}
              </span>

              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-4 w-4" />
                {formatPostedDate(job.posted_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-lg bg-white"
            onClick={handleSaveJob}
            disabled={savingJob}
          >
            {savingJob ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-slate-600" />
            )}
          </Button>

          {/* Share Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share this job</DialogTitle>
                <DialogDescription>
                  Copy this job link or share it directly with others.
                </DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="job-link" className="sr-only">
                    Job Link
                  </Label>

                  <Input id="job-link" value={jobShareLink} readOnly />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {copied && (
                <p className="text-sm text-green-600">
                  Job link copied successfully!
                </p>
              )}

              <DialogFooter className="gap-2 sm:justify-between">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Close
                  </Button>
                </DialogClose>

                <Button type="button" onClick={handleNativeShare}>
                  Share Job
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Apply Dialog */}
          <Dialog open={openApplyDialog} onOpenChange={setOpenApplyDialog}>
            <DialogTrigger asChild>
              <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                Apply Now
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
              <form onSubmit={handleApplySubmit}>
                <DialogHeader>
                  <DialogTitle>Apply for this Job</DialogTitle>
                  <DialogDescription>
                    Submit your CV and cover letter for{" "}
                    <strong>{job.title}</strong> at{" "}
                    <strong>{companyName}</strong>.
                  </DialogDescription>
                </DialogHeader>

                <FieldGroup className="mt-5 space-y-4">
                  <Field>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={applicationData.fullName}
                      onChange={handleApplicationChange}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      value={applicationData.email}
                      onChange={handleApplicationChange}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+233 24 000 0000"
                      value={applicationData.phone}
                      onChange={handleApplicationChange}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="portfolio">Portfolio / LinkedIn Link</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      placeholder="https://linkedin.com/in/yourname"
                      value={applicationData.portfolio}
                      onChange={handleApplicationChange}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="cv">CV / Resume</Label>
                    <Input
                      id="cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleApplicationChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </Field>

                  <Field>
                    <Label htmlFor="transcript">Transcript</Label>
                    <Input
                      id="transcript"
                      name="transcript"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleApplicationChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional, but recommended.
                    </p>
                  </Field>

                  <Field>
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <textarea
                      id="coverLetter"
                      name="coverLetter"
                      rows="5"
                      placeholder="Briefly tell the employer why you are a good fit for this role..."
                      value={applicationData.coverLetter}
                      onChange={handleApplicationChange}
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
                      required
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button type="submit" disabled={applying}>
                    {applying ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting...
                      </span>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default JobDetailsHeader;
