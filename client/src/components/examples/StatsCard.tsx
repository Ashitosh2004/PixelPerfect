import { StatsCard } from "../StatsCard";
import { FileText, BarChart3, Users, TrendingUp } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        title="Active Users"
        value={156}
        icon={Users}
        trend={{ value: "3%", positive: false }}
      />
      <StatsCard
        title="Growth Rate"
        value="23%"
        icon={TrendingUp}
        trend={{ value: "5%", positive: true }}
      />
    </div>
  );
}
