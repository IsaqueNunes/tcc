import { ChartDataDto } from "libs/models/chart-data-dto"
import { VictoryPie } from "victory-native"

type Props = {
  chartData: ChartDataDto[]
}

export default function ChartTicketsByMonth({ chartData }: Props) {
  console.log('teste');
  return (
    <VictoryPie
      data={chartData.filter(item => item.ticketCounting > 0)}
      x="month"
      y="ticketCounting"
      padding={35}
      height={300}
      labels={({ datum }) => `${datum.month.substring(0, 3)}: ${datum.ticketCounting}`}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      animate={{
        easing: 'bounce'
      }}
      style={{ labels: { fontSize: 14 }, }}
    />
  )
}
