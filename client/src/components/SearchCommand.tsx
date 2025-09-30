import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { 
  Home, 
  Upload, 
  BarChart3, 
  Users, 
  Settings, 
  FileText,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useRealtimeQuery } from "@/hooks/useRealtimeData";
import { Upload as UploadType } from "@shared/schema";

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const [, navigate] = useLocation();
  const { currentUser } = useFirebaseAuth();
  const { data: uploads } = useRealtimeQuery<UploadType>('uploads', 'userId', currentUser?.id || '');

  const pages = [
    { name: "Dashboard", icon: Home, url: "/", keywords: ["home", "overview", "stats"] },
    { name: "Upload & Analyze", icon: Upload, url: "/analyze", keywords: ["upload", "file", "excel", "csv", "analyze"] },
    { name: "My Charts", icon: BarChart3, url: "/charts", keywords: ["charts", "visualizations", "graphs"] },
    { name: "Settings", icon: Settings, url: "/settings", keywords: ["settings", "preferences", "account"] },
  ];

  if (currentUser?.role === "admin") {
    pages.push({ name: "User Management", icon: Users, url: "/admin/users", keywords: ["users", "admin", "management"] });
  }

  const quickActions = [
    { name: "Total Uploads", icon: FileText, action: () => navigate("/charts"), keywords: ["uploads", "total", "stats"] },
    { name: "Charts Created", icon: BarChart3, action: () => navigate("/charts"), keywords: ["charts", "created", "stats"] },
    { name: "This Week", icon: Clock, action: () => navigate("/"), keywords: ["week", "recent", "stats"] },
    { name: "Avg Growth", icon: TrendingUp, action: () => navigate("/"), keywords: ["growth", "average", "stats"] },
  ];

  const handleSelect = (callback: () => void) => {
    onOpenChange(false);
    callback();
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, uploads, or actions..." data-testid="input-search-command" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem
              key={page.url}
              value={`${page.name} ${page.keywords.join(" ")}`}
              onSelect={() => handleSelect(() => navigate(page.url))}
              data-testid={`search-item-${page.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <page.icon className="mr-2 h-4 w-4" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {uploads && uploads.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Recent Uploads">
              {uploads.slice(0, 5).map((upload) => (
                <CommandItem
                  key={upload.id}
                  value={`${upload.filename} upload ${upload.chartType}`}
                  onSelect={() => handleSelect(() => navigate("/charts"))}
                  data-testid={`search-item-upload-${upload.id}`}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>{upload.filename}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}

        <CommandSeparator />
        <CommandGroup heading="Quick Actions">
          {quickActions.map((action) => (
            <CommandItem
              key={action.name}
              value={`${action.name} ${action.keywords.join(" ")}`}
              onSelect={() => handleSelect(action.action)}
              data-testid={`search-item-action-${action.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <action.icon className="mr-2 h-4 w-4" />
              <span>{action.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
