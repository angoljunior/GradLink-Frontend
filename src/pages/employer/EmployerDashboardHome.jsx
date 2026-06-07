import React from "react";
import { SectionCards } from "@/components/section-cards";
/* import { DataTable } from "@/components/data-table"; */
import data from "@/app/dashboard/data.json";
import EmployerReport from "@/components/EmployerReport";
import EApplicants from "@/components/EApplicants";
import EmployerRecentApplications from "@/components/EmployerRecentApplications";

const EmployerDashboardHome = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex items-center justify-between mx-5 ">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Employer Report
            </h1>
            <p className="text-muted-foreground">
              View and analyze job applications, candidate activity, and hiring
              performance.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />

          <div className="px-4 lg:px-6"></div>

          <EmployerReport />
          {/* <EApplicants /> */}
          <EmployerRecentApplications />
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardHome;
