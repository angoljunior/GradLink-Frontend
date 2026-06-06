import React from "react";
import { TrendingUp } from "lucide-react";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart as RechartsLineChart,
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
  { month: "January", applications: 18, shortlisted: 5 },
  { month: "February", applications: 25, shortlisted: 8 },
  { month: "March", applications: 32, shortlisted: 12 },
  { month: "April", applications: 21, shortlisted: 7 },
  { month: "May", applications: 40, shortlisted: 15 },
  { month: "June", applications: 48, shortlisted: 18 },
];

const chartConfig = {
  applications: {
    label: "Applications",
    color: "var(--chart-1)",
  },
  shortlisted: {
    label: "Shortlisted",
    color: "var(--chart-2)",
  },
};

const LineChartComponent = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Applications Trend</CardTitle>
        <CardDescription>January - June 2026</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsLineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            <Line
              dataKey="applications"
              type="natural"
              stroke="var(--color-applications)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-applications)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>

            <Line
              dataKey="shortlisted"
              type="natural"
              stroke="var(--color-shortlisted)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-shortlisted)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Applications increased by 5.2% this month
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total candidate applications for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChartComponent;
