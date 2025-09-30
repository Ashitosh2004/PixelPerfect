import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";
import { ChartBuilder } from "@/components/ChartBuilder";
import { ChartPreview } from "@/components/ChartPreview";

export default function AnalyzePage() {
  const [uploadedData, setUploadedData] = useState<{ filename: string; columns: string[] } | null>(null);
  const [chartConfig, setChartConfig] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload & Analyze</h1>
        <p className="text-muted-foreground mt-1">Upload your Excel files and create interactive visualizations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Upload File</h2>
              <FileUploader onFileUpload={setUploadedData} />
            </div>

            {uploadedData && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Chart Preview</h2>
                <ChartPreview
                  chartType={chartConfig?.chartType || "bar"}
                  xAxis={chartConfig?.xAxis || ""}
                  yAxis={chartConfig?.yAxis || ""}
                  is3D={chartConfig?.is3D}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          {uploadedData && (
            <>
              <h2 className="text-lg font-semibold mb-4">Configuration</h2>
              <ChartBuilder
                columns={uploadedData.columns}
                onChartGenerate={setChartConfig}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
