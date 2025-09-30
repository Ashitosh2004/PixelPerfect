import { UploadHistory } from "@/components/UploadHistory";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useRealtimeQuery } from "@/hooks/useRealtimeData";
import { Upload } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

export default function ChartsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { currentUser } = useFirebaseAuth();
  const { data: uploads, loading } = useRealtimeQuery<Upload>('uploads', 'userId', currentUser?.id || '');

  const allUploads = uploads?.map(upload => ({
    id: upload.id,
    filename: upload.filename,
    date: formatDistanceToNow(new Date(upload.uploadDate), { addSuffix: true }),
    chartType: upload.chartType,
    xAxis: upload.xAxis,
    yAxis: upload.yAxis,
  })) || [];

  const filteredUploads = allUploads.filter((upload) => {
    const matchesSearch = upload.filename.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || upload.chartType === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Charts</h1>
        <p className="text-muted-foreground mt-1">View and manage all your created charts.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search charts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-charts"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-[180px]" data-testid="select-filter-charts">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="bar">Bar Chart</SelectItem>
            <SelectItem value="line">Line Chart</SelectItem>
            <SelectItem value="pie">Pie Chart</SelectItem>
            <SelectItem value="scatter">Scatter Plot</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">Loading charts...</div>
      ) : filteredUploads.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {search || filter !== "all" ? "No charts match your filters." : "No charts yet. Create your first chart!"}
        </div>
      ) : (
        <UploadHistory uploads={filteredUploads} />
      )}
    </div>
  );
}
