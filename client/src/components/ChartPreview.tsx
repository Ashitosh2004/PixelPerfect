import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ChartPreviewProps {
  chartType: string;
  xAxis: string;
  yAxis: string;
  is3D?: boolean;
}

export function ChartPreview({ chartType, xAxis, yAxis, is3D }: ChartPreviewProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Chart Preview</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{chartType}</Badge>
            {is3D && <Badge>3D</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-around p-8 gap-2">
            {[65, 45, 80, 55, 90, 70, 60].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/20 rounded-t hover-elevate transition-all"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="relative z-10 text-center p-4">
            <p className="text-sm text-muted-foreground">
              X: {xAxis || "Not selected"} • Y: {yAxis || "Not selected"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
