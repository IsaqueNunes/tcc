import LineChart from '../../../components/LineChart';
import PieChart from '../../../components/PieChart';
import './charts.css';

type Props = {
  userData: any
}

export default function Charts({ userData }: Props) {
  return (
    <div className="charts-container">
      <div style={{ width: '50%' }}>
        <LineChart chartData={userData} />
      </div>
      <div style={{ width: '30%' }}>
        <PieChart chartData={userData} />
      </div>
    </div>
  )
}
