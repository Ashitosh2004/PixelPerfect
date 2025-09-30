import { UploadHistory } from "../UploadHistory";

export default function UploadHistoryExample() {
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
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload History</h2>
      <UploadHistory 
        uploads={mockUploads}
        onDelete={(id) => console.log("Delete:", id)}
      />
    </div>
  );
}
