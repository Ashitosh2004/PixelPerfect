import { UploadHistory } from "@/components/UploadHistory";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

export default function ChartsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
    {
      id: "4",
      filename: "Customer_Data.xlsx",
      date: "5 days ago",
      chartType: "scatter",
      xAxis: "Age",
      yAxis: "Spending",
    },
    {
      id: "5",
      filename: "Marketing_Metrics.xlsx",
      date: "1 week ago",
      chartType: "bar",
      xAxis: "Channel",
      yAxis: "Conversions",
    },
  ];

  const filteredUploads = mockUploads.filter((upload) => {
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

      <UploadHistory uploads={filteredUploads} />
    </div>
  );
}
