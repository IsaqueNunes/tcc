import { Message, Ticket } from "@prisma/client"
import { ChartDataDto } from "./chart-data-dto"

export type AdminDashboardInformationDto = {
  openingTicketsCounting: number
  solvedTicketsCounting: number
  lastMessageCommented: Message & {
    ticket: Ticket;
  }
  chartData: ChartDataDto[]
}
