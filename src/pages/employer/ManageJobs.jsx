import React, { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
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

import api from "@/api/axios";

const emptyForm = {
  title: "",
  category: "",
  description: "",
  responsibilities: "",
  requirements: "",
  job_type: "graduate_program",
  work_mode: "onsite",
  location: "",
  salary_min: "",
  salary_max: "",
  deadline: "",
  is_active: true,
};

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const getArrayData = (data) => {
    return Array.isArray(data) ? data : data.results || [];
  };

  const fetchEmployerJobs = async () => {
    try {
      setLoading(true);

      const [jobsResponse, categoriesResponse] = await Promise.all([
        api.get("/employer/jobs/"),
        api.get("/job-categories/"),
      ]);

      setJobs(getArrayData(jobsResponse.data));
      setCategories(getArrayData(categoriesResponse.data));
    } catch (error) {
      console.log(
        "Failed to fetch employer jobs:",
        error.response?.data || error,
      );

      toast.error("Failed to load jobs", {
        description:
          error.response?.data?.detail ||
          "Please refresh the page and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = searchTerm.toLowerCase().trim();

      const categoryName =
        job.category_details?.name?.toLowerCase() ||
        job.category?.name?.toLowerCase() ||
        "";

      const matchesSearch =
        job.title?.toLowerCase().includes(searchValue) ||
        job.location?.toLowerCase().includes(searchValue) ||
        job.job_type_display?.toLowerCase().includes(searchValue) ||
        job.work_mode_display?.toLowerCase().includes(searchValue) ||
        categoryName.includes(searchValue);

      const statusValue = job.is_active ? "Open" : "Closed";

      const matchesStatus =
        statusFilter === "All" || statusValue === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingJobId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildPayload = () => {
    return {
      title: formData.title,
      category: formData.category ? Number(formData.category) : null,
      description: formData.description,
      responsibilities: formData.responsibilities,
      requirements: formData.requirements,
      job_type: formData.job_type,
      work_mode: formData.work_mode,
      location: formData.location,
      salary_min: formData.salary_min || null,
      salary_max: formData.salary_max || null,
      deadline: formData.deadline,
      is_active: formData.is_active,
    };
  };

  const validateForm = () => {
    if (!formData.title.trim()) return "Job title is required.";
    if (!formData.category) return "Job category is required.";
    if (!formData.description.trim()) return "Job description is required.";
    if (!formData.responsibilities.trim())
      return "Responsibilities are required.";
    if (!formData.requirements.trim()) return "Requirements are required.";
    if (!formData.location.trim()) return "Location is required.";
    if (!formData.deadline) return "Application deadline is required.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      toast.warning("Missing information", {
        description: validationError,
      });
      return;
    }

    try {
      setSubmitting(true);

      const payload = buildPayload();

      if (editingJobId) {
        const response = await api.patch(
          `/employer/jobs/${editingJobId}/`,
          payload,
        );

        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === editingJobId ? response.data : job,
          ),
        );

        toast.success("Job updated successfully", {
          description: "Your job post has been updated.",
        });
      } else {
        const response = await api.post("/employer/jobs/", payload);

        setJobs((prevJobs) => [response.data, ...prevJobs]);

        toast.success("Job posted successfully", {
          description: "Your job has been submitted for approval.",
        });
      }

      resetForm();
    } catch (error) {
      console.log("Failed to save job:", error.response?.data || error);

      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.title?.[0] ||
        error.response?.data?.category?.[0] ||
        error.response?.data?.description?.[0] ||
        error.response?.data?.deadline?.[0] ||
        "Failed to save job. Please check the form and try again.";

      toast.error("Unable to save job", {
        description: errorMessage,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (job) => {
    setEditingJobId(job.id);

    setFormData({
      title: job.title || "",
      category: job.category || job.category_details?.id || "",
      description: job.description || "",
      responsibilities: job.responsibilities || "",
      requirements: job.requirements || "",
      job_type: job.job_type || "graduate_program",
      work_mode: job.work_mode || "onsite",
      location: job.location || "",
      salary_min: job.salary_min || "",
      salary_max: job.salary_max || "",
      deadline: job.deadline || "",
      is_active: job.is_active,
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(jobId);

      await api.delete(`/employer/jobs/${jobId}/`);

      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));

      toast.success("Job deleted", {
        description: "The job post has been removed successfully.",
      });
    } catch (error) {
      console.log("Failed to delete job:", error.response?.data || error);

      toast.error("Unable to delete job", {
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const toggleJobStatus = async (job) => {
    try {
      const response = await api.patch(`/employer/jobs/${job.id}/`, {
        is_active: !job.is_active,
      });

      setJobs((prevJobs) =>
        prevJobs.map((item) => (item.id === job.id ? response.data : item)),
      );

      toast.success(job.is_active ? "Job closed" : "Job opened", {
        description: job.is_active
          ? "This job is no longer active."
          : "This job is now active.",
      });
    } catch (error) {
      console.log(
        "Failed to update job status:",
        error.response?.data || error,
      );

      toast.error("Unable to update job status", {
        description: "Please try again.",
      });
    }
  };

  const getStatusStyle = (job) => {
    if (!job.is_active) return "bg-red-100 text-red-700";

    if (!job.is_approved) return "bg-yellow-100 text-yellow-700";

    return "bg-green-100 text-green-700";
  };

  const getStatusLabel = (job) => {
    if (!job.is_active) return "Closed";
    if (!job.is_approved) return "Pending Approval";
    return "Open";
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not specified";

    return new Date(dateValue).toLocaleDateString("en-GH", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPostedDate = (dateValue) => {
    if (!dateValue) return "Recently";

    const postedDate = new Date(dateValue);
    const now = new Date();
    const diffDays = Math.floor((now - postedDate) / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  return (
    <div className="space-y-6 px-4 py-4 lg:px-6">
      <div className="flex flex-col gap-4 rounded-xl border bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <h1 className="text-2xl font-bold tracking-tight">Manage Jobs</h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Create, edit, close, and manage job posts from your employer
            dashboard.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditingJobId(null);
            setFormData(emptyForm);
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New Job
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {editingJobId ? "Edit Job" : "Post New Job"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the job details below based on your Django Job model.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border p-2 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Graduate Engineer"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Job Type</label>
              <select
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              >
                <option value="graduate_program">Graduate Program</option>
                <option value="internship">Internship</option>
                <option value="entry_level">Entry Level Job</option>
                <option value="national_service">National Service</option>
                <option value="trainee">Trainee Program</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Work Mode</label>
              <select
                name="work_mode"
                value={formData.work_mode}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              >
                <option value="onsite">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Accra, Ghana"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Minimum Salary</label>
              <input
                type="number"
                name="salary_min"
                value={formData.salary_min}
                onChange={handleChange}
                placeholder="e.g. 2500"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Maximum Salary</label>
              <input
                type="number"
                name="salary_max"
                value={formData.salary_max}
                onChange={handleChange}
                placeholder="e.g. 5000"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Describe the job..."
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows="4"
                placeholder="Write each responsibility on a new line..."
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows="4"
                placeholder="Write each requirement on a new line..."
                className="mt-2 w-full rounded-md border px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-2">
              <input
                id="is_active"
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="is_active" className="text-sm font-medium">
                Make this job active
              </label>
            </div>

            <div className="flex items-end justify-start gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting
                  ? editingJobId
                    ? "Updating..."
                    : "Posting..."
                  : editingJobId
                    ? "Update Job"
                    : "Post Job"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border px-5 py-2.5 text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Posted Jobs</h2>
            <p className="text-sm text-muted-foreground">
              View all jobs posted by your company.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-md border pl-9 pr-3 text-sm outline-none focus:border-black sm:w-72"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading jobs...
            </div>
          </div>
        ) : (
          <Table>
            <TableCaption>A list of jobs posted by your company.</TableCaption>

            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applicants</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">
                      <Link
                        to={`/job/${job.id}`}
                        className="hover:text-yellow-700 hover:underline"
                      >
                        {job.title}
                      </Link>
                    </TableCell>

                    <TableCell>
                      {job.category_details?.name || "Not specified"}
                    </TableCell>

                    <TableCell>{job.location}</TableCell>

                    <TableCell>
                      {job.job_type_display || job.job_type}
                    </TableCell>

                    <TableCell>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                          job,
                        )}`}
                      >
                        {getStatusLabel(job)}
                      </span>
                    </TableCell>

                    <TableCell>{job.applicants_count || 0}</TableCell>

                    <TableCell>{formatPostedDate(job.posted_at)}</TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/employer-dashboard/applicants?job=${job.id}`}
                          title="View applicants"
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <button
                          title="Edit job"
                          onClick={() => handleEdit(job)}
                          className="rounded-md border p-2 hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          title={job.is_active ? "Close job" : "Open job"}
                          onClick={() => toggleJobStatus(job)}
                          className="rounded-md border px-3 py-2 text-xs hover:bg-gray-100"
                        >
                          {job.is_active ? "Close" : "Open"}
                        </button>

                        <button
                          title="Delete job"
                          onClick={() => handleDelete(job.id)}
                          disabled={deletingId === job.id}
                          className="rounded-md border p-2 text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {deletingId === job.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No jobs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;
