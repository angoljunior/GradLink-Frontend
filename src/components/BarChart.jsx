import React from "react";
import { TrendingUp } from "lucide-react";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", jobs: 4 },
  { month: "February", jobs: 7 },
  { month: "March", jobs: 5 },
  { month: "April", jobs: 9 },
  { month: "May", jobs: 12 },
  { month: "June", jobs: 15 },
];

const chartConfig = {
  jobs: {
    label: "Jobs Posted",
    color: "var(--chart-1)",
  },
};

const BarChartComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs Posted</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="jobs" fill="var(--color-jobs)" radius={8} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Job postings increased by 5.2% this month
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total jobs posted for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default BarChartComponent;
