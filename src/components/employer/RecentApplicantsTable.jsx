import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const applicants = [
  {
    id: 1,
    candidate: "Kwame Mensah",
    role: "Software Engineer Trainee",
    university: "KNUST",
    status: "Pending",
    applied: "2 hours ago",
  },
  {
    id: 2,
    candidate: "Ama Osei",
    role: "Marketing Associate",
    university: "University of Ghana",
    status: "Reviewed",
    applied: "1 day ago",
  },
  {
    id: 3,
    candidate: "Kofi Annan",
    role: "Financial Analyst",
    university: "UCC",
    status: "Shortlisted",
    applied: "2 days ago",
  },
  {
    id: 4,
    candidate: "Abena Boakye",
    role: "Software Engineer Trainee",
    university: "Ashesi",
    status: "Interviewed",
    applied: "3 days ago",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
    case "Reviewed":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";
    case "Shortlisted":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";
    case "Interviewed":
      return "bg-emerald-100 text-emerald-700 hover:bg-emerald-100";
    default:
      return "bg-slate-100 text-slate-700 hover:bg-slate-100";
  }
};

const RecentApplicantsTable = () => {
  return (
    <Card className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-950">
              Recent Applicants
            </h2>
            <p className="text-xs text-slate-500">
              Latest candidates awaiting review
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="rounded-lg bg-white text-xs"
          >
            View All
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <Table>
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
              {applicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  <TableCell className="font-medium text-yellow-600">
                    {applicant.candidate}
                  </TableCell>

                  <TableCell>{applicant.role}</TableCell>

                  <TableCell>{applicant.university}</TableCell>

                  <TableCell>
                    <Badge
                      className={`rounded-full px-3 ${getStatusClass(
                        applicant.status
                      )}`}
                    >
                      {applicant.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right text-slate-500">
                    {applicant.applied}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplicantsTable;