import React, { useMemo, useState } from "react";
import { Briefcase, Plus, Search, Pencil, Trash2, Eye, X } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const initialJobs = [
  {
    id: 1,
    title: "Electrical Engineering Intern",
    department: "Engineering",
    location: "Obuasi, Ghana",
    type: "Internship",
    status: "Open",
    applicants: 24,
    posted: "2 hours ago",
  },
  {
    id: 2,
    title: "Graduate Trainee Engineer",
    department: "Operations",
    location: "Accra, Ghana",
    type: "Full-time",
    status: "Open",
    applicants: 18,
    posted: "1 day ago",
  },
  {
    id: 3,
    title: "Junior Frontend Developer",
    department: "Software",
    location: "Remote",
    type: "Contract",
    status: "Closed",
    applicants: 36,
    posted: "5 days ago",
  },
  {
    id: 4,
    title: "Control and Instrumentation Intern",
    department: "Maintenance",
    location: "Tarkwa, Ghana",
    type: "Internship",
    status: "Open",
    applicants: 12,
    posted: "1 week ago",
  },
];

const ManageJobs = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    type: "Full-time",
    status: "Open",
  });

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchValue) ||
        job.department.toLowerCase().includes(searchValue) ||
        job.location.toLowerCase().includes(searchValue) ||
        job.type.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [jobs, searchTerm, statusFilter]);

  const resetForm = () => {
    setFormData({
      title: "",
      department: "",
      location: "",
      type: "Full-time",
      status: "Open",
    });

    setEditingJobId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.department || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    if (editingJobId) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === editingJobId
            ? {
                ...job,
                ...formData,
              }
            : job,
        ),
      );
    } else {
      const newJob = {
        id: Date.now(),
        ...formData,
        applicants: 0,
        posted: "Just now",
      };

      setJobs((prevJobs) => [newJob, ...prevJobs]);
    }

    resetForm();
  };

  const handleEdit = (job) => {
    setEditingJobId(job.id);

    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      status: job.status,
    });

    setShowForm(true);
  };

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
  };

  const toggleJobStatus = (jobId) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: job.status === "Open" ? "Closed" : "Open",
            }
          : job,
      ),
    );
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700";
      case "Closed":
        return "bg-red-100 text-red-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            setFormData({
              title: "",
              department: "",
              location: "",
              type: "Full-time",
              status: "Open",
            });
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
                Fill in the job details below.
              </p>
            </div>

            <button
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
                placeholder="e.g. Electrical Engineering Intern"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="e.g. Engineering"
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              />
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
              <label className="text-sm font-medium">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="National Service">National Service</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 h-11 w-full rounded-md border px-3 text-sm outline-none focus:border-black"
              >
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            <div className="flex items-end justify-start gap-3">
              <button
                type="submit"
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {editingJobId ? "Update Job" : "Save Job"}
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
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <Table>
          <TableCaption>A list of jobs posted by your company.</TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Department</TableHead>
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
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.department}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>

                  <TableCell>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        job.status,
                      )}`}
                    >
                      {job.status}
                    </span>
                  </TableCell>

                  <TableCell>{job.applicants}</TableCell>
                  <TableCell>{job.posted}</TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <button
                        title="View applicants"
                        className="rounded-md border p-2 hover:bg-gray-100"
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        title="Edit job"
                        onClick={() => handleEdit(job)}
                        className="rounded-md border p-2 hover:bg-gray-100"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        title={job.status === "Open" ? "Close job" : "Open job"}
                        onClick={() => toggleJobStatus(job.id)}
                        className="rounded-md border px-3 py-2 text-xs hover:bg-gray-100"
                      >
                        {job.status === "Open" ? "Close" : "Open"}
                      </button>

                      <button
                        title="Delete job"
                        onClick={() => handleDelete(job.id)}
                        className="rounded-md border p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
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
      </div>
    </div>
  );
};

export default ManageJobs;
