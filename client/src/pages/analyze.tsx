import { useState, useRef } from "react";
import { FileUploader } from "@/components/FileUploader";
import { ChartBuilder } from "@/components/ChartBuilder";
import { ChartPreview } from "@/components/ChartPreview";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { FirebaseService } from "@/services/firebase.service";
import { useToast } from "@/hooks/use-toast";

export default function AnalyzePage() {
  const [uploadedData, setUploadedData] = useState<{ filename: string; columns: string[]; data: any[] } | null>(null);
  const [chartConfig, setChartConfig] = useState<any>(null);
  const { currentUser } = useFirebaseAuth();
  const { toast } = useToast();
  const chartRef = useRef<HTMLDivElement>(null);

  const handleChartGenerate = async (config: any) => {
    if (!currentUser || !uploadedData) return;

    try {
      await FirebaseService.createUpload({
        userId: currentUser.id,
        filename: uploadedData.filename,
        chartType: config.chartType,
        chartData: { columns: uploadedData.columns, data: uploadedData.data },
        xAxis: config.xAxis,
        yAxis: config.yAxis,
        is3D: config.is3D || false,
      });

      setChartConfig(config);
      
      toast({
        title: "Chart saved",
        description: "Your chart has been saved to Firebase",
      });
    } catch (error) {
      console.error("Error saving chart:", error);
      toast({
        title: "Error",
        description: "Failed to save chart",
        variant: "destructive",
      });
    }
  };

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
                  ref={chartRef}
                  chartType={chartConfig?.chartType || "bar"}
                  xAxis={chartConfig?.xAxis || ""}
                  yAxis={chartConfig?.yAxis || ""}
                  is3D={chartConfig?.is3D}
                  chartData={uploadedData.data}
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
                onChartGenerate={handleChartGenerate}
                chartRef={chartRef}
                filename={uploadedData.filename}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
