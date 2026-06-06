import { Building2, MapPin, Clock, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JobDetailsHeader = () => {
  const [copied, setCopied] = useState(false);

  const jobShareLink = window.location.href;

  const handleNativeShare = async () => {
    const shareData = {
      title: "Job Opportunity",
      text: "Check out this job opportunity on GradLink.",
      url: jobShareLink,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(jobShareLink);
        setCopied(true);

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

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.log("Failed to copy link:", error);
    }
  };

  return (
    <section className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-xl border border-slate-200 bg-white flex items-center justify-center shadow-sm">
            <Building2 className="h-10 w-10 text-slate-500" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-950">
              Graduate Engineer – Network Operations
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm md:text-base">
              <span className="flex items-center gap-1.5 text-yellow-600 font-medium">
                <Building2 className="h-4 w-4" />
                MTN Ghana
              </span>

              <span className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="h-4 w-4" />
                Accra
              </span>

              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-4 w-4" />
                Posted 10 days ago
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-lg bg-white"
          >
            <Bookmark className="h-5 w-5 text-slate-600" />
          </Button>

          {/* Share Button with Dialog */}
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

          {/*  Apply Button with Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Apply Now</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
              <form>
                <DialogHeader>
                  <DialogTitle>Apply for this Job</DialogTitle>
                  <DialogDescription>
                    Fill in your details and upload your CV/resume to submit
                    your application.
                  </DialogDescription>
                </DialogHeader>

                <FieldGroup className="mt-5 space-y-4">
                  {/* Full Name */}
                  <Field>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      required
                    />
                  </Field>

                  {/* Email */}
                  <Field>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </Field>

                  {/* Phone */}
                  <Field>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+233 24 000 0000"
                      required
                    />
                  </Field>

                  {/* Portfolio / LinkedIn */}
                  <Field>
                    <Label htmlFor="portfolio">Portfolio / LinkedIn Link</Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </Field>

                  {/* CV / Resume */}
                  <Field>
                    <Label htmlFor="resume">CV / Resume</Label>
                    <Input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Accepted formats: PDF, DOC, DOCX
                    </p>
                  </Field>

                  {/* Cover Letter */}
                  <Field>
                    <Label htmlFor="coverLetter">Cover Letter</Label>
                    <Input
                      id="coverLetter"
                      name="coverLetter"
                      type="file"
                      accept=".pdf,.doc,.docx"
                    />
                    <p className="text-xs text-muted-foreground">
                      Optional, but recommended.
                    </p>
                  </Field>

                  {/* Message */}
                  <Field>
                    <Label htmlFor="message">Short Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      placeholder="Briefly tell the employer why you are a good fit for this role..."
                      className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
                    />
                  </Field>
                </FieldGroup>

                <DialogFooter className="mt-6">
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>

                  <Button type="submit">Submit Application</Button>
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
