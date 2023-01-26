import { ChartDataDto } from "libs/models/chart-data-dto"
import { VictoryPie } from "victory-native"

type Props = {
  chartData: ChartDataDto[]
}

export default function ChartTicketsByMonth({ chartData }: Props) {
  return (
    <VictoryPie
      data={chartData.filter(item => item.ticketCounting > 0)}
      x="month"
      y="ticketCounting"
      padding={35}
      height={300}
      labels={({ datum }) => `${datum.month}: ${datum.ticketCounting}`}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      animate={{
        easing: 'bounce'
      }}
      style={{ labels: { fontSize: 16 } }}
    />
  )
}
