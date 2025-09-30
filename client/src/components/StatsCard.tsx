import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

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
    <Card className="hover-elevate transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent" data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium mt-2 ${trend.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {trend.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{trend.value}</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
