import { useState, useCallback } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface FileUploaderProps {
  onFileUpload: (data: any) => void;
}

export function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string; progress: number; complete: boolean }[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    const fileData = {
      name: file.name,
      size: (file.size / 1024).toFixed(2) + " KB",
      progress: 0,
      complete: false,
    };
    
    setFiles(prev => [...prev, fileData]);
    
    const interval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.name === file.name && !f.complete) {
          const newProgress = Math.min(f.progress + 20, 100);
          return {
            ...f,
            progress: newProgress,
            complete: newProgress === 100,
          };
        }
        return f;
      }));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
      onFileUpload({
        filename: file.name,
        columns: ["Month", "Revenue", "Expenses", "Profit", "Growth"],
      });
    }, 1200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(file => {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload .xlsx or .xls files only",
          variant: "destructive",
        });
      }
    });
  }, [toast, onFileUpload]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(file => {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        processFile(file);
      }
    });
  };

  const removeFile = (filename: string) => {
    setFiles(prev => prev.filter(f => f.name !== filename));
  };

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Drop your Excel files here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            or click to browse (.xlsx, .xls)
          </p>
          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            data-testid="input-file-upload"
          />
          <label htmlFor="file-upload">
            <Button asChild data-testid="button-browse-files">
              <span className="cursor-pointer">Browse Files</span>
            </Button>
          </label>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-3">
                <File className="h-5 w-5 text-primary" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <span className="text-xs text-muted-foreground ml-2">{file.size}</span>
                  </div>
                  {!file.complete ? (
                    <Progress value={file.progress} className="h-1" />
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <CheckCircle className="h-3 w-3" />
                      <span>Complete</span>
                    </div>
                  )}
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.name)}
                  data-testid={`button-remove-${index}`}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
