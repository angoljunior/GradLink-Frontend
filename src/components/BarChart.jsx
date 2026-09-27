
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

const chartConfig = {
  jobs: {
    label: "Jobs Posted",
    color: "var(--chart-1)",
  },
};

const BarChartComponent = ({ chartData = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs Posted</CardTitle>
        <CardDescription>{chartData[0]?.month} – {chartData.at(-1)?.month}</CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.some((row) => row.jobs > 0) ? <ChartContainer config={chartConfig}>
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
        </ChartContainer> : <p className="py-20 text-center text-sm text-muted-foreground">No jobs in the last six months.</p>}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Jobs posted this month: {chartData.at(-1)?.jobs ?? 0}
        </div>

        <div className="leading-none text-muted-foreground">
          Showing total jobs posted for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};

export default BarChartComponent;
