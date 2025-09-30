import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface ChartPreviewProps {
  chartType: string;
  xAxis: string;
  yAxis: string;
  is3D?: boolean;
}

const mockData = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 198 },
  { name: "Mar", value: 600, value2: 380 },
  { name: "Apr", value: 450, value2: 300 },
  { name: "May", value: 700, value2: 450 },
  { name: "Jun", value: 550, value2: 380 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export function ChartPreview({ chartType, xAxis, yAxis, is3D }: ChartPreviewProps) {
  const renderChart = () => {
    if (!xAxis || !yAxis) {
      return (
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">
              Select X and Y axis to preview chart
            </p>
          </div>
        </div>
      );
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="value" fill={COLORS[0]} name={yAxis} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={COLORS[0]} name={yAxis} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill={COLORS[0]}
                dataKey="value"
              >
                {mockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </PieChart>
          </ResponsiveContainer>
        );
      
      case "scatter":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="value" stroke="hsl(var(--foreground))" name={xAxis} />
              <YAxis dataKey="value2" stroke="hsl(var(--foreground))" name={yAxis} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Data Points" data={mockData} fill={COLORS[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle>Chart Preview</CardTitle>
          <div className="flex gap-2">
            <Badge variant="secondary">{chartType}</Badge>
            {is3D && <Badge>3D</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-video rounded-md flex items-center justify-center">
          {renderChart()}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            X: {xAxis || "Not selected"} • Y: {yAxis || "Not selected"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
