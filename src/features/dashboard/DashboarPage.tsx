import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "./dashboardService";
import { getStatusColor } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import DashboardSkeleton from "./components/DashboardSkeleton";
import { Button } from "@/components/ui/button";

const DashboarPage = () => {
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
  if (isLoading || isFetching) return <DashboardSkeleton />;
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center space-y-4 h-screen">
        <p className="text-red-500 text-lg font-medium">
          Failed to load dashboard data.
        </p>
        <Button onClick={() => refetch()} variant="default">
          Retry
        </Button>
      </div>
    );
  }

  const statusData = data?.statusChart.labels.map(
    (label: string, i: number) => ({
      name: label,
      count: data?.statusChart.data[i],
    })
  );

  const applicationData = data?.applicationsChart.labels.map(
    (label: string, i: number) => ({
      name: label,
      count: data?.applicationsChart.data[i],
    })
  );

  const statusConfig = {
    count: {
      label: "Applications",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const applicationConfig = {
    count: {
      label: "Skills",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of your job applications and resume performance.
        </p>
      </header>
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Applications</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data?.summary.totalApplications}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Resumes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data?.summary.totalResumes}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Fit Score</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data?.summary.averageFitScore.toFixed(1)}%
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={statusConfig}>
              <BarChart accessibilityLayer data={statusData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={applicationConfig}>
              <BarChart accessibilityLayer data={applicationData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="count" fill="var(--color-count)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {data?.recentApplications.map((job: any) => (
              <li key={job.id} className={`py-2 flex justify-between `}>
                <span>
                  {job.company} — {job.position}
                </span>
                <span
                  className={`text-sm text-gray-500 p-1 rounded-sm ${getStatusColor(
                    job.status
                  )}`}
                >
                  {job.status}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/* Top matches */}
      <Card>
        <CardHeader>
          <CardTitle>Top Job Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-gray-200">
            {data?.topMatches.map((m: any, i: number) => (
              <li key={i} className="py-2">
                <div className="flex justify-between">
                  <span>
                    {m.company} — {m.position}
                  </span>
                  <span className="font-semibold">
                    {m.fitScore.toFixed(1)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboarPage;
