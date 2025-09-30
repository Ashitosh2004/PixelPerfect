import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Upload {
  id: string;
  filename: string;
  date: string;
  chartType: string;
  xAxis: string;
  yAxis: string;
}

interface UploadHistoryProps {
  uploads: Upload[];
  onDelete?: (id: string) => void;
}

export function UploadHistory({ uploads, onDelete }: UploadHistoryProps) {
  const { toast } = useToast();

  const handleDownload = (filename: string) => {
    console.log("Downloading:", filename);
    toast({
      title: "Download started",
      description: `Downloading ${filename}`,
    });
  };

  const handleDelete = (id: string, filename: string) => {
    console.log("Deleting:", id);
    onDelete?.(id);
    toast({
      title: "Upload deleted",
      description: `${filename} has been removed`,
    });
  };

  return (
    <div className="space-y-3">
      {uploads.map((upload) => (
        <Card key={upload.id} className="hover-elevate">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-md bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h4 className="font-medium truncate">{upload.filename}</h4>
                    <p className="text-xs text-muted-foreground">{upload.date}</p>
                  </div>
                  <Badge variant="secondary">{upload.chartType}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {upload.xAxis} vs {upload.yAxis}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDownload(upload.filename)}
                  data-testid={`button-download-${upload.id}`}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDelete(upload.id, upload.filename)}
                  data-testid={`button-delete-${upload.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
