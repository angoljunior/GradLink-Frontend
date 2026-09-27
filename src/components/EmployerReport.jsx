import { Link } from "react-router-dom";
import LineChartComponent from "@/components/LineChart";
import BarChartComponent from "@/components/BarChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/table";

export default function EmployerReport({ data }) {
  return <div className="space-y-6">
    <div className="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <LineChartComponent chartData={data.trend} />
      <BarChartComponent chartData={data.trend} />
    </div>
    <div className="mx-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card><CardHeader><CardTitle>Application Status Pipeline</CardTitle></CardHeader><CardContent>
        {data.metrics.total_applications ? <dl className="space-y-3">{data.pipeline.map((item) => <div key={item.status} className="flex justify-between border-b pb-2 text-sm"><dt>{item.label}</dt><dd className="font-semibold">{item.count}</dd></div>)}</dl> : <p className="py-8 text-center text-sm text-muted-foreground">No applications yet.</p>}
      </CardContent></Card>
      <Card><CardHeader><CardTitle>Applications per Job</CardTitle></CardHeader><CardContent>
        {data.applications_per_job.length ? <Table><TableHeader><TableRow><TableHead>Job</TableHead><TableHead className="text-right">Applications</TableHead></TableRow></TableHeader><TableBody>{data.applications_per_job.map((job) => <TableRow key={job.id}><TableCell>{job.title}</TableCell><TableCell className="text-right">{job.applications_count}</TableCell></TableRow>)}</TableBody></Table> : <p className="py-8 text-center text-sm text-muted-foreground">No jobs posted yet.</p>}
        <p className="mt-3 text-xs text-muted-foreground">Top 10 jobs by application count. <Link to="/employer/jobs" className="text-yellow-700 underline">Manage all jobs</Link></p>
      </CardContent></Card>
    </div>
  </div>;
}
