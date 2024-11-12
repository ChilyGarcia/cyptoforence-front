import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  LineChart,
  TrendingUp,
  Volume2,
} from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";
import { Data } from "@/interface/data.interface";
import { StatCard } from "@/components/response/StatCard";
import { TrendChart } from "@/components/response/TrendChart";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface DataCardProps {
  data: Data | null;
}

const DataCard: React.FC<DataCardProps> = ({ data }) => {
  if (!data) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }

  const priceChange = data.price_trend[data.price_trend.length - 1] || 0;
  const isPriceUp = priceChange >= 0;

  return (
    <div className="space-y-4 p-4 pt-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Current Price"
          value={formatCurrency(data.price.mean)}
          icon={DollarSign}
          description={
            <span className={isPriceUp ? "text-green-500" : "text-red-500"}>
              {isPriceUp ? "+" : ""}
              {formatCurrency(priceChange)} (
              {((priceChange / data.price.mean) * 100).toFixed(2)}%)
            </span>
          }
        />
        <StatCard
          title="24h Volume"
          value={formatNumber(data.volume.total)}
          icon={Volume2}
          description={`Avg ${formatNumber(data.volume.mean)} per hour`}
        />
        <StatCard
          title="Price Range"
          value={`${formatCurrency(data.price.min)} - ${formatCurrency(
            data.price.max
          )}`}
          icon={LineChart}
          description={`Volatility: ${(data.price.volatility * 100).toFixed(
            2
          )}%`}
        />
        <StatCard
          title="Price Movement"
          value={formatCurrency(data.price.std_dev)}
          icon={TrendingUp}
          description="Standard Deviation"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Price Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hourly" className="space-y-4">
              <TabsList>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="price">Price</TabsTrigger>
              </TabsList>
              <TabsContent value="hourly">
                <TrendChart
                  data={{
                    labels: Object.keys(data.hourly_trend).map((date) =>
                      formatDate(new Date(date), "HH:mm")
                    ),
                    values: Object.values(data.hourly_trend),
                  }}
                  title="Hourly Price Trend"
                />
              </TabsContent>
              <TabsContent value="price">
                <TrendChart
                  data={{
                    labels: Object.keys(data.price_trend).map((date) =>
                      formatDate(new Date(date), "MMM dd")
                    ),
                    values: Object.values(data.price_trend),
                  }}
                  title="price Price Trend"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Price Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendChart
              data={{
                labels: Array.from(
                  { length: data.price_trend.length },
                  (_, i) => `${i}h`
                ),
                values: data.price_trend,
              }}
              type="bar"
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataCard;
