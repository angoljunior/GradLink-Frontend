import React, { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applications = [
  {
    id: 1,
    jobTitle: "Electrical Engineering Intern",
    company: "AngloGold Ashanti",
    status: "Pending",
    dateApplied: "2026-06-02",
  },
  {
    id: 2,
    jobTitle: "Graduate Trainee Engineer",
    company: "Genser Energy",
    status: "Reviewed",
    dateApplied: "2026-05-29",
  },
  {
    id: 3,
    jobTitle: "Control and Instrumentation Intern",
    company: "Newmont Ghana",
    status: "Accepted",
    dateApplied: "2026-05-25",
  },
  {
    id: 4,
    jobTitle: "National Service Personnel",
    company: "Sinetheta Engineering Group Limited",
    status: "Pending",
    dateApplied: "2026-05-21",
  },
  {
    id: 5,
    jobTitle: "Junior Software Developer",
    company: "Hubtel",
    status: "Rejected",
    dateApplied: "2026-05-18",
  },
  {
    id: 6,
    jobTitle: "Power Systems Trainee",
    company: "GRIDCo Ghana",
    status: "Reviewed",
    dateApplied: "2026-05-15",
  },
  {
    id: 7,
    jobTitle: "Frontend Developer Intern",
    company: "MTN Ghana",
    status: "Pending",
    dateApplied: "2026-05-10",
  },
];

const SDashboardInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch =
        application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Reviewed":
        return "bg-blue-100 text-blue-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm mx-4">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Job Applications</h2>
          <p className="text-sm text-muted-foreground">
            Track the latest jobs you have applied for.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search job or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your recent job applications.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Date Applied</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">
                  {application.jobTitle}
                </TableCell>

                <TableCell>{application.company}</TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      application.status,
                    )}`}
                  >
                    {application.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  {application.dateApplied}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-muted-foreground"
              >
                No applications found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SDashboardInfo;
