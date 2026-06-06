import React from "react";
import LineChartComponent from "@/components/LineChart";
import BarChartComponent from "@/components/BarChart";

const EmployerReport = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mx-5">
        <LineChartComponent />
        <BarChartComponent />
      </div>
    </div>
  );
};

export default EmployerReport;
