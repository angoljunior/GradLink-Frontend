import React, { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  BriefcaseBusiness,
  Building2,
  CheckCheck,
  Clock,
  Eye,
  Loader2,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
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

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [readFilter, setReadFilter] = useState("All");

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [markingReadId, setMarkingReadId] = useState(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/student/notifications/");

      const notificationsData = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setNotifications(notificationsData);
    } catch (error) {
      console.log(
        "Failed to fetch notifications:",
        error.response?.data || error,
      );

      toast.error("Failed to load notifications", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    const searchValue = searchTerm.toLowerCase().trim();

    return notifications.filter((notification) => {
      const title = notification.title?.toLowerCase() || "";
      const message = notification.message?.toLowerCase() || "";
      const role = notification.application_role?.toLowerCase() || "";
      const company = notification.company_name?.toLowerCase() || "";

      const matchesSearch =
        title.includes(searchValue) ||
        message.includes(searchValue) ||
        role.includes(searchValue) ||
        company.includes(searchValue);

      const matchesReadFilter =
        readFilter === "All" ||
        (readFilter === "Unread" && !notification.is_read) ||
        (readFilter === "Read" && notification.is_read);

      return matchesSearch && matchesReadFilter;
    });
  }, [notifications, searchTerm, readFilter]);

  const unreadCount = notifications.filter((item) => !item.is_read).length;

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

  const getNotificationTypeStyle = (type) => {
    switch (type) {
      case "application_status":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100";
      case "message":
        return "bg-purple-100 text-purple-700 hover:bg-purple-100";
      case "job_alert":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
      default:
        return "bg-slate-100 text-slate-700 hover:bg-slate-100";
    }
  };

  const getNotificationTypeLabel = (type) => {
    switch (type) {
      case "application_status":
        return "Application Status";
      case "message":
        return "Message";
      case "job_alert":
        return "Job Alert";
      default:
        return "General";
    }
  };

  const handleOpenNotification = async (notification) => {
    setSelectedNotification(notification);
    setOpenDialog(true);

    if (!notification.is_read) {
      await handleMarkAsRead(notification.id, false);
    }
  };

  const handleMarkAsRead = async (notificationId, showToast = true) => {
    try {
      setMarkingReadId(notificationId);

      await api.patch(`/student/notifications/${notificationId}/read/`);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification,
        ),
      );

      setSelectedNotification((prev) =>
        prev?.id === notificationId
          ? {
              ...prev,
              is_read: true,
            }
          : prev,
      );

      if (showToast) {
        toast.success("Notification marked as read");
      }
    } catch (error) {
      console.log(
        "Failed to mark notification as read:",
        error.response?.data || error,
      );

      toast.error("Failed to update notification", {
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setMarkingReadId(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter((item) => !item.is_read);

    if (unreadNotifications.length === 0) {
      toast.info("No unread notifications");
      return;
    }

    try {
      await Promise.all(
        unreadNotifications.map((notification) =>
          api.patch(`/student/notifications/${notification.id}/read/`),
        ),
      );

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );

      toast.success("All notifications marked as read");
    } catch (error) {
      console.log("Failed to mark all as read:", error.response?.data || error);

      toast.error("Failed to mark all as read", {
        description: "Please try again.",
      });
    }
  };

  return (
    <div className="px-4 py-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">Notifications</h1>

              {unreadCount > 0 && (
                <Badge className="rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                  {unreadCount} unread
                </Badge>
              )}
            </div>

            <p className="mt-2 text-muted-foreground">
              Track application updates, job alerts, and platform messages.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                type="text"
                placeholder="Search notifications..."
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
              <option value="All">All</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>

            <Button variant="outline" onClick={handleMarkAllAsRead}>
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading notifications...
            </div>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <Bell className="mx-auto h-10 w-10 text-slate-400" />

            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No notifications found
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Application updates and alerts will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl border p-5 transition hover:shadow-sm ${
                  notification.is_read ? "bg-white" : "bg-yellow-50/70"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-white">
                      {notification.is_read ? (
                        <Bell className="h-5 w-5 text-slate-500" />
                      ) : (
                        <BellRing className="h-5 w-5 text-yellow-600" />
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-semibold text-slate-950">
                          {notification.title}
                        </h2>

                        {!notification.is_read && (
                          <Badge className="rounded-full bg-yellow-500 text-black hover:bg-yellow-500">
                            New
                          </Badge>
                        )}

                        <Badge
                          className={`rounded-full ${getNotificationTypeStyle(
                            notification.notification_type,
                          )}`}
                        >
                          {getNotificationTypeLabel(
                            notification.notification_type,
                          )}
                        </Badge>
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                        {notification.message}
                      </p>

                      {notification.application_role && (
                        <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                          <BriefcaseBusiness className="h-4 w-4 text-yellow-600" />
                          {notification.application_role}
                        </p>
                      )}

                      {notification.company_name && (
                        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                          <Building2 className="h-4 w-4 text-yellow-600" />
                          {notification.company_name}
                        </p>
                      )}

                      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        {formatDate(notification.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:justify-end">
                    {!notification.is_read && (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={markingReadId === notification.id}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        {markingReadId === notification.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCheck className="mr-2 h-4 w-4" />
                        )}
                        Read
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenNotification(notification)}
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

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedNotification?.title || "Notification Details"}
            </DialogTitle>
            <DialogDescription>
              {selectedNotification
                ? getNotificationTypeLabel(
                    selectedNotification.notification_type,
                  )
                : "Notification information"}
            </DialogDescription>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-5">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div>
                    <p className="font-medium text-slate-900">Type</p>
                    <p>
                      {getNotificationTypeLabel(
                        selectedNotification.notification_type,
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="font-medium text-slate-900">Date</p>
                    <p>{formatDate(selectedNotification.created_at)}</p>
                  </div>

                  {selectedNotification.application_role && (
                    <div>
                      <p className="font-medium text-slate-900">Application</p>
                      <p>{selectedNotification.application_role}</p>
                    </div>
                  )}

                  {selectedNotification.company_name && (
                    <div>
                      <p className="font-medium text-slate-900">Company</p>
                      <p>{selectedNotification.company_name}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-semibold text-slate-900">Message</h3>

                <div className="rounded-xl border bg-white p-4 text-sm leading-7 text-slate-700">
                  <p className="whitespace-pre-line">
                    {selectedNotification.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                {selectedNotification.application && (
                  <Button
                    asChild
                    className="bg-yellow-500 text-black hover:bg-yellow-600"
                  >
                    <Link to="/student-dashboard/applications">
                      View Application
                    </Link>
                  </Button>
                )}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  className="sm:ml-auto"
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

export default Notifications;
