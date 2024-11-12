import { Line, Bar } from "react-chartjs-2";
import { Card, CardContent } from "@/components/ui/card";
import { ChartOptions } from "chart.js";

interface TrendChartProps {
  data: {
    labels: string[];
    values: (number | null)[];
  };
  title?: string;
  type?: "line" | "bar";
  options?: ChartOptions<"line" | "bar">;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  title,
  type = "line",
  options = {},
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        fill: false,
        borderColor: "hsl(var(--primary))",
        backgroundColor:
          type === "bar"
            ? data.values.map((v) =>
                (v || 0) >= 0
                  ? "rgba(34, 197, 94, 0.5)"
                  : "rgba(239, 68, 68, 0.5)"
              )
            : undefined,
        borderWidth: type === "line" ? 2 : 1,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  };

  const defaultOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        position: "right",
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  const ChartComponent = type === "line" ? Line : Bar;

  return (
    <div className="w-full h-[300px]">
      <ChartComponent
        data={chartData}
        options={{
          ...defaultOptions,
          ...options,
        }}
      />
    </div>
  );
};
