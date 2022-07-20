import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Ticket } from '@prisma/client';

@Injectable()
export class TicketsService {
  private prisma = new PrismaClient();

  public create(ticket: Prisma.TicketUncheckedCreateInput): Promise<Ticket> {
    return this.prisma.ticket.create({ data: { ...ticket } });
  }

  public update(id: number, updatedTicket: Prisma.TicketUncheckedUpdateInput): Promise<Ticket> {
    console.log(updatedTicket);
    return this.prisma.ticket.update({
      where: { id },
      data: { ...updatedTicket },
    });
  }

  public changeStatus(id: number, status: string): Promise<Ticket> {
    if (status === 'FECHADO') {
      return this.prisma.ticket.update({
        where: { id },
        data: {
          status,
          closedAt: new Date(),
        },
      });
    }

    return this.prisma.ticket.update({
      where: { id },
      data: { status },
    });
  }

  public find(id: number): Promise<Ticket> {
    return this.prisma.ticket.findUnique({ where: { id } });
  }

  public list(): Promise<Ticket[]> {
    return this.prisma.ticket.findMany();
  }
}
