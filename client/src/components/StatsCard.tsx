import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1" data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {trend && (
              <p className={`text-xs mt-1 ${trend.positive ? "text-green-600" : "text-red-600"}`}>
                {trend.positive ? "+" : ""}{trend.value}
              </p>
            )}
          </div>
          <div className="p-3 rounded-md bg-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
