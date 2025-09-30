import { useState, RefObject } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart, PieChart, ScatterChart, Download, Box } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downloadChartAsPNG, downloadChartAsPDF } from "@/lib/chartDownload";

interface ChartBuilderProps {
  columns: string[];
  onChartGenerate: (config: any) => void;
  chartRef?: RefObject<HTMLDivElement>;
  filename?: string;
}

export function ChartBuilder({ columns, onChartGenerate, chartRef, filename }: ChartBuilderProps) {
  const [chartType, setChartType] = useState("bar");
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [is3D, setIs3D] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!xAxis || !yAxis) {
      toast({
        title: "Missing selection",
        description: "Please select both X and Y axis",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Generating chart:", { chartType, xAxis, yAxis, is3D });
    onChartGenerate({ chartType, xAxis, yAxis, is3D });
    toast({
      title: "Chart generated",
      description: `${chartType} chart created successfully`,
    });
  };

  const handleDownload = async (format: string) => {
    if (!chartRef?.current) {
      toast({
        title: "Error",
        description: "Chart not available for download",
        variant: "destructive",
      });
      return;
    }

    try {
      const chartFilename = filename?.replace(/\.[^/.]+$/, "") || "chart";
      
      if (format === "png") {
        await downloadChartAsPNG(chartRef.current, chartFilename);
      } else if (format === "pdf") {
        await downloadChartAsPDF(chartRef.current, chartFilename);
      }
      
      toast({
        title: "Download complete",
        description: `Chart exported as ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Failed to export chart",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Chart Type</Label>
          <Tabs value={chartType} onValueChange={setChartType}>
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="bar" data-testid="tab-bar">
                <BarChart3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="line" data-testid="tab-line">
                <LineChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="pie" data-testid="tab-pie">
                <PieChart className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="scatter" data-testid="tab-scatter">
                <ScatterChart className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label htmlFor="x-axis">X-Axis</Label>
          <Select value={xAxis} onValueChange={setXAxis}>
            <SelectTrigger id="x-axis" data-testid="select-x-axis">
              <SelectValue placeholder="Select X-axis column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((col) => (
                <SelectItem key={col} value={col}>
                  {col}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="y-axis">Y-Axis</Label>
          <Select value={yAxis} onValueChange={setYAxis}>
            <SelectTrigger id="y-axis" data-testid="select-y-axis">
              <SelectValue placeholder="Select Y-axis column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((col) => (
                <SelectItem key={col} value={col}>
                  {col}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={is3D ? "default" : "outline"}
            size="sm"
            onClick={() => setIs3D(!is3D)}
            data-testid="button-toggle-3d"
          >
            <Box className="h-4 w-4 mr-2" />
            {is3D ? "3D Enabled" : "Enable 3D"}
          </Button>
        </div>

        <Button 
          className="w-full" 
          onClick={handleGenerate}
          data-testid="button-generate-chart"
        >
          Generate Chart
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDownload("png")}
            data-testid="button-download-png"
          >
            <Download className="h-4 w-4 mr-2" />
            PNG
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => handleDownload("pdf")}
            data-testid="button-download-pdf"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
