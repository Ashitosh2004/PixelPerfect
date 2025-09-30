import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FileText, Download, Trash2, Eye, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChartPreview } from "@/components/ChartPreview";
import { FirebaseService } from "@/services/firebase.service";
import { downloadChartAsPNG } from "@/lib/chartDownload";
import { Upload as UploadType } from "@shared/schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

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
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUpload, setSelectedUpload] = useState<UploadType | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; filename: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const handleView = async (id: string) => {
    try {
      const upload = await FirebaseService.getUpload(id);
      if (upload) {
        setSelectedUpload(upload);
        setViewDialogOpen(true);
      } else {
        toast({
          title: "Error",
          description: "Chart not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error loading chart:", error);
      toast({
        title: "Error",
        description: "Failed to load chart",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    if (!chartRef.current || !selectedUpload) return;
    
    setIsDownloading(true);
    try {
      const filename = selectedUpload.filename.replace(/\.[^/.]+$/, "");
      await downloadChartAsPNG(chartRef.current, filename);
      
      toast({
        title: "Download complete",
        description: `${selectedUpload.filename} downloaded successfully`,
      });
    } catch (error) {
      console.error("Download error:", error);
      toast({
        title: "Download failed",
        description: "Failed to export chart",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteClick = (id: string, filename: string) => {
    setDeleteTarget({ id, filename });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    
    setIsDeleting(true);
    try {
      await FirebaseService.deleteUpload(deleteTarget.id);
      onDelete?.(deleteTarget.id);
      
      toast({
        title: "Chart deleted",
        description: `${deleteTarget.filename} has been removed`,
      });
      
      setDeleteDialogOpen(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Delete failed",
        description: "Failed to delete chart",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
                    onClick={() => handleView(upload.id)}
                    data-testid={`button-view-${upload.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteClick(upload.id, upload.filename)}
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

      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedUpload?.filename}</DialogTitle>
            <DialogDescription>
              {selectedUpload && `${selectedUpload.chartType} chart • ${selectedUpload.xAxis} vs ${selectedUpload.yAxis}`}
            </DialogDescription>
          </DialogHeader>
          {selectedUpload && (
            <div className="py-4">
              <ChartPreview
                ref={chartRef}
                chartType={selectedUpload.chartType}
                xAxis={selectedUpload.xAxis}
                yAxis={selectedUpload.yAxis}
                is3D={selectedUpload.is3D}
                chartData={selectedUpload.chartData?.data}
              />
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setViewDialogOpen(false)}
              data-testid="button-close-chart-dialog"
            >
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
            <Button
              onClick={handleDownload}
              disabled={isDownloading}
              data-testid="button-download-chart"
            >
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download PNG"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chart</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.filename}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              data-testid="button-confirm-delete"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
