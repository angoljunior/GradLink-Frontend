
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

const LineChartComponent = ({ chartData = [] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Applications Trend</CardTitle>
        <CardDescription>{chartData[0]?.month} – {chartData.at(-1)?.month}</CardDescription>
      </CardHeader>

      <CardContent>
        {chartData.some((row) => row.applications > 0) ? <ChartContainer config={chartConfig}>
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
        </ChartContainer> : <p className="py-20 text-center text-sm text-muted-foreground">No applications in the last six months.</p>}
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Applications this month: {chartData.at(-1)?.applications ?? 0}
        </div>

        <div className="leading-none text-muted-foreground">
          Applications grouped by submission month; shortlisted shows their current status.
        </div>
      </CardFooter>
    </Card>
  );
};

export default LineChartComponent;
