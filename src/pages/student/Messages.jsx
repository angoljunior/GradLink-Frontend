import React, { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Search,
  Mail,
  MailOpen,
  BriefcaseBusiness,
  Clock,
  Building2,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import api from "@/api/axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [readFilter, setReadFilter] = useState("All");

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [openMessage, setOpenMessage] = useState(false);
  const [markingReadId, setMarkingReadId] = useState(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await api.get("/student/messages/");

      const messagesData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setMessages(messagesData);
    } catch (error) {
      console.log("Failed to fetch messages:", error.response?.data || error);

      toast.error("Failed to load messages", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const filteredMessages = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return messages.filter((message) => {
      const subject = message.subject?.toLowerCase() || "";
      const body = message.body?.toLowerCase() || "";
      const sender = message.sender_name?.toLowerCase() || "";
      const role = message.application_role?.toLowerCase() || "";
      const company = message.company_name?.toLowerCase() || "";

      const matchesSearch =
        subject.includes(searchValue) ||
        body.includes(searchValue) ||
        sender.includes(searchValue) ||
        role.includes(searchValue) ||
        company.includes(searchValue);

      const matchesReadFilter =
        readFilter === "All" ||
        (readFilter === "Unread" && !message.is_read) ||
        (readFilter === "Read" && message.is_read);

      return matchesSearch && matchesReadFilter;
    });
  }, [messages, searchTerm, readFilter]);

  const unreadCount = messages.filter((message) => !message.is_read).length;

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    return new Date(dateValue).toLocaleString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleOpenMessage = async (message) => {
    setSelectedMessage(message);
    setOpenMessage(true);

    if (!message.is_read) {
      await handleMarkAsRead(message.id, false);
    }
  };

  const handleMarkAsRead = async (messageId, showToast = true) => {
    try {
      setMarkingReadId(messageId);

      await api.patch(`/messages/${messageId}/read/`);

      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                is_read: true,
              }
            : message,
        ),
      );

      setSelectedMessage((prev) =>
        prev?.id === messageId
          ? {
              ...prev,
              is_read: true,
            }
          : prev,
      );

      if (showToast) {
        toast.success("Message marked as read");
      }
    } catch (error) {
      console.log(
        "Failed to mark message as read:",
        error.response?.data || error,
      );

      toast.error("Failed to update message", {
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setMarkingReadId(null);
    }
  };

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Messages</h1>

              {unreadCount > 0 && (
                <Badge className="rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  {unreadCount} unread
                </Badge>
              )}
            </div>

            <p className="mt-2 text-muted-foreground">
              View direct messages from employers about your job applications.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-9 sm:w-80"
              />
            </div>

            <select
              value={readFilter}
              onChange={(e) => setReadFilter(e.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:border-black"
            >
              <option value="All">All Messages</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading messages...
            </div>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <Mail className="mx-auto h-10 w-10 text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No messages found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Employer messages about your applications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`rounded-xl border p-5 transition hover:shadow-sm ${
                  message.is_read ? "bg-white" : "bg-yellow-50/60"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white">
                      {message.is_read ? (
                        <MailOpen className="h-5 w-5 text-slate-500" />
                      ) : (
                        <Mail className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold text-slate-950">
                          {message.subject || "No Subject"}
                        </h2>

                        {!message.is_read && (
                          <Badge className="rounded-full bg-yellow-500 text-black hover:bg-yellow-500">
                            New
                          </Badge>
                        )}
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        From: {message.sender_name || "Employer"}
                      </p>

                      {message.application_role && (
                        <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                          <BriefcaseBusiness className="h-4 w-4 text-yellow-600" />
                          {message.application_role}
                        </p>
                      )}

                      {message.company_name && (
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                          <Building2 className="h-4 w-4 text-yellow-600" />
                          {message.company_name}
                        </p>
                      )}

                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                        {message.body}
                      </p>

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(message.sent_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    {!message.is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={markingReadId === message.id}
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        {markingReadId === message.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <MailOpen className="mr-2 h-4 w-4" />
                        )}
                        Mark Read
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenMessage(message)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={openMessage} onOpenChange={setOpenMessage}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMessage?.subject || "Message Details"}
            </DialogTitle>
            <DialogDescription>
              Message from {selectedMessage?.sender_name || "Employer"}
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-5">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-slate-900">Sender</p>
                    <p>{selectedMessage.sender_name || "Employer"}</p>
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">Date Sent</p>
                    <p>{formatDate(selectedMessage.sent_at)}</p>
                  </div>

                  {selectedMessage.application_role && (
                    <div>
                      <p className="font-medium text-slate-900">Application</p>
                      <p>{selectedMessage.application_role}</p>
                    </div>
                  )}

                  {selectedMessage.company_name && (
                    <div>
                      <p className="font-medium text-slate-900">Company</p>
                      <p>{selectedMessage.company_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-slate-900">Message</h3>

                <div className="rounded-xl border bg-white p-4 text-sm leading-7 text-slate-700">
                  <p className="whitespace-pre-line">{selectedMessage.body}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenMessage(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
