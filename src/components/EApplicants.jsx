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

const applicants = [
  {
    id: 1,
    candidate: "Kwame Mensah",
    role: "Electrical Engineering Intern",
    university: "University of Mines and Technology",
    status: "Pending",
    applied: "15 minutes ago",
  },
  {
    id: 2,
    candidate: "Ama Serwaa",
    role: "Graduate Trainee Engineer",
    university: "University of Ghana",
    status: "Reviewed",
    applied: "2 hours ago",
  },
  {
    id: 3,
    candidate: "Daniel Ofori",
    role: "Control and Instrumentation Intern",
    university: "KNUST",
    status: "Shortlisted",
    applied: "1 day ago",
  },
  {
    id: 4,
    candidate: "Esi Boateng",
    role: "National Service Personnel",
    university: "Accra Technical University",
    status: "Pending",
    applied: "3 days ago",
  },
  {
    id: 5,
    candidate: "Michael Owusu",
    role: "Junior Software Developer",
    university: "Ashesi University",
    status: "Rejected",
    applied: "5 days ago",
  },
  {
    id: 6,
    candidate: "Abena Nyarko",
    role: "Power Systems Trainee",
    university: "University of Energy and Natural Resources",
    status: "Reviewed",
    applied: "1 week ago",
  },
  {
    id: 7,
    candidate: "Kojo Appiah",
    role: "Frontend Developer Intern",
    university: "Ghana Communication Technology University",
    status: "Shortlisted",
    applied: "2 weeks ago",
  },
];

const EApplicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApplicants = useMemo(() => {
    return applicants.filter((applicant) => {
      const searchValue = searchTerm.toLowerCase();

      const matchesSearch =
        applicant.candidate.toLowerCase().includes(searchValue) ||
        applicant.role.toLowerCase().includes(searchValue) ||
        applicant.university.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || applicant.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
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
    <div className="mx-4 rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Recent Applicants</h2>
          <p className="text-sm text-muted-foreground">
            View and manage candidates who recently applied to your job posts.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search candidate, role, or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:border-black sm:w-72"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border px-3 text-sm outline-none focus:border-black"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <Table>
        <TableCaption>
          A list of recent applicants for your job posts.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>University</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Applied</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell className="font-medium">
                  {applicant.candidate}
                </TableCell>

                <TableCell>{applicant.role}</TableCell>

                <TableCell>{applicant.university}</TableCell>

                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                      applicant.status,
                    )}`}
                  >
                    {applicant.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  {applicant.applied}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="py-8 text-center text-muted-foreground"
              >
                No applicants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EApplicants;
