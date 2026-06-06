import React from "react";

const MyApplications = () => {
  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="mt-2 text-muted-foreground">
          View and track all jobs you have applied for.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Job Title</th>
                <th className="py-3">Company</th>
                <th className="py-3">Location</th>
                <th className="py-3">Status</th>
                <th className="py-3">Date Applied</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Electrical Engineer</td>
                <td className="py-3">Genser Energy</td>
                <td className="py-3">Accra</td>
                <td className="py-3">Pending</td>
                <td className="py-3">June 2, 2026</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Control and Instrumentation Intern</td>
                <td className="py-3">AngloGold Ashanti</td>
                <td className="py-3">Obuasi</td>
                <td className="py-3">Reviewed</td>
                <td className="py-3">May 29, 2026</td>
              </tr>

              <tr>
                <td className="py-3">Graduate Trainee</td>
                <td className="py-3">Sinetheta Engineering</td>
                <td className="py-3">Tema</td>
                <td className="py-3">Accepted</td>
                <td className="py-3">May 24, 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
