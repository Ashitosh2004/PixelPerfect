import { ChartPreview } from "../ChartPreview";

export default function ChartPreviewExample() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <ChartPreview 
        chartType="bar"
        xAxis="Month"
        yAxis="Revenue"
        is3D={false}
      />
    </div>
  );
}
