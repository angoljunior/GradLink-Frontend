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
import MyApplications from "@/pages/student/MyApplications";

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
    <>
      <MyApplications />
    </>
  );
};

export default SDashboardInfo;
