import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Props specific to LineChart
interface LineChartProps {
  data: ChartData<"line", number[], string>;
  options?: ChartOptions<"line">;
}

// Props specific to BarChart
interface BarChartProps {
  data: ChartData<"bar", number[], string>;
  options?: ChartOptions<"bar">;
}

// LineChart component
export const LineChart: React.FC<LineChartProps> = ({ data, options }) => (
  <Line
    data={data}
    options={{
      responsive: true,
      plugins: { legend: { position: "top" } },
      ...options,
    }}
  />
);

// BarChart component
export const BarChart: React.FC<BarChartProps> = ({ data, options }) => (
  <Bar
    data={data}
    options={{
      responsive: true,
      plugins: { legend: { position: "top" } },
      ...options,
    }}
  />
);
