import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

ChartJS.register(...registerables);

interface ImageProps {
  chartData: any
}

export default function LineChart({ chartData }: ImageProps) {
  return <Line style={{ overflowX: 'scroll' }} data={chartData} />;
}
