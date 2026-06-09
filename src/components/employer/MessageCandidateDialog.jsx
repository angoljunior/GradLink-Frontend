import React, { useState } from "react";
import { Loader2, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import api from "@/api/axios";

const MessageCandidateDialog = ({ application, onMessageSent }) => {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const [formData, setFormData] = useState({
    subject: "",
    body: "",
  });

  const candidateName = application?.candidate_name || "Candidate";
  const role = application?.role || "this role";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      subject: "",
      body: "",
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      toast.warning("Subject required", {
        description: "Please enter a message subject.",
      });
      return;
    }

    if (!formData.body.trim()) {
      toast.warning("Message required", {
        description: "Please type your message before sending.",
      });
      return;
    }

    try {
      setSending(true);

      const response = await api.post(
        `/employer/applications/${application.id}/message/`,
        {
          subject: formData.subject,
          body: formData.body,
        },
      );

      toast.success("Message sent", {
        description:
          response.data?.message ||
          `Your message has been sent to ${candidateName}.`,
      });

      resetForm();
      setOpen(false);

      if (onMessageSent) {
        onMessageSent(response.data);
      }
    } catch (error) {
      console.log("Message sending failed:", error.response?.data || error);

      toast.error("Failed to send message", {
        description:
          error.response?.data?.detail ||
          error.response?.data?.body?.[0] ||
          "Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-2 h-4 w-4" />
          Message
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Message Candidate</DialogTitle>
          <DialogDescription>
            Send a direct message to {candidateName} about the application for{" "}
            <strong>{role}</strong>.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSendMessage} className="mt-4 space-y-5">
          <div className="rounded-lg border bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-900">
              {candidateName}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {application?.candidate_email}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Role: {role}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Interview invitation"
              disabled={sending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Message</Label>
            <textarea
              id="body"
              name="body"
              rows="6"
              value={formData.body}
              onChange={handleChange}
              placeholder="Write your message to the candidate..."
              disabled={sending}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={sending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageCandidateDialog;
