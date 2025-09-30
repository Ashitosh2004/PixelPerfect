import { ChartBuilder } from "../ChartBuilder";

export default function ChartBuilderExample() {
  const mockColumns = ["Month", "Revenue", "Expenses", "Profit", "Growth"];
  
  return (
    <div className="p-6 max-w-md mx-auto">
      <ChartBuilder 
        columns={mockColumns}
        onChartGenerate={(config) => console.log("Chart config:", config)}
      />
    </div>
  );
}
