import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);
interface PieChartProps {
  chartData: any;
}

export default function PieChart({ chartData }: PieChartProps) {
  return (
    <Pie data={chartData} />
  );
}
