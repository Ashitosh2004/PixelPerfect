import { StatsCard } from "@/components/StatsCard";
import { UploadHistory } from "@/components/UploadHistory";
import { FileText, BarChart3, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Dashboard() {
  const [, navigate] = useLocation();

  const mockUploads = [
    {
      id: "1",
      filename: "Q1_Sales_Data.xlsx",
      date: "2 hours ago",
      chartType: "bar",
      xAxis: "Month",
      yAxis: "Revenue",
    },
    {
      id: "2",
      filename: "Annual_Report_2024.xlsx",
      date: "1 day ago",
      chartType: "line",
      xAxis: "Quarter",
      yAxis: "Growth",
    },
    {
      id: "3",
      filename: "Product_Analysis.xlsx",
      date: "3 days ago",
      chartType: "pie",
      xAxis: "Category",
      yAxis: "Sales",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your analytics overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Uploads"
          value={24}
          icon={FileText}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Charts Created"
          value={48}
          icon={BarChart3}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="This Week"
          value={7}
          icon={Clock}
        />
        <StatsCard
          title="Avg Growth"
          value="23%"
          icon={TrendingUp}
          trend={{ value: "5%", positive: true }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Uploads</h2>
          <Button onClick={() => navigate("/analyze")} data-testid="button-new-upload">
            New Upload
          </Button>
        </div>
        <UploadHistory uploads={mockUploads} />
      </div>
    </div>
  );
}
