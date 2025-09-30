import { StatsCard } from "@/components/StatsCard";
import { UploadHistory } from "@/components/UploadHistory";
import { FileText, BarChart3, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useRealtimeQuery } from "@/hooks/useRealtimeData";
import { Upload } from "@shared/schema";
import { useEffect, useState } from "react";
import { FirebaseService } from "@/services/firebase.service";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { currentUser } = useFirebaseAuth();
  const { data: uploads, loading } = useRealtimeQuery<Upload>('uploads', 'userId', currentUser?.id || '');
  const [stats, setStats] = useState({ totalUploads: 0, chartsCreated: 0, thisWeek: 0, avgGrowth: "0%" });

  useEffect(() => {
    if (currentUser) {
      FirebaseService.getUserStats(currentUser.id).then(setStats);
    }
  }, [currentUser, uploads]);

  const recentUploads = uploads
    ?.sort((a, b) => b.uploadDate - a.uploadDate)
    .slice(0, 3)
    .map(upload => ({
      id: upload.id,
      filename: upload.filename,
      date: formatDistanceToNow(new Date(upload.uploadDate), { addSuffix: true }),
      chartType: upload.chartType,
      xAxis: upload.xAxis,
      yAxis: upload.yAxis,
    })) || [];

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -top-2 -right-2 w-32 h-32 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back! Here's your analytics overview.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Uploads"
          value={stats.totalUploads}
          icon={FileText}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Charts Created"
          value={stats.chartsCreated}
          icon={BarChart3}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="This Week"
          value={stats.thisWeek}
          icon={Clock}
        />
        <StatsCard
          title="Avg Growth"
          value={stats.avgGrowth}
          icon={TrendingUp}
          trend={{ value: "5%", positive: true }}
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <h2 className="text-2xl font-semibold">Recent Uploads</h2>
          <Button onClick={() => navigate("/analyze")} data-testid="button-new-upload">
            New Upload
          </Button>
        </div>
        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading uploads...</div>
        ) : recentUploads.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No uploads yet. Create your first chart!</div>
        ) : (
          <UploadHistory uploads={recentUploads} />
        )}
      </div>
    </div>
  );
}
