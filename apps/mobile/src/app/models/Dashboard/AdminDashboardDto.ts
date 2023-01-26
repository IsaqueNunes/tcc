import { Message, Ticket } from "@prisma/client";
import { ChartDataDto } from "libs/models/chart-data-dto";

export type AdminDashboardDto = {
  openingTicketsCounting: number
  solvedTicketsCounting: number
  lastMessageCommented: Message & {
    ticket: Ticket;
  }
  chartData: ChartDataDto[]
}
