import { Injectable } from '@nestjs/common';
import { Message, Prisma, PrismaClient } from '@prisma/client';
import { TicketsService } from '@tcc/tickets';
import { MessageWithStatusDto } from 'libs/models/message-with-status-dto';

@Injectable()
export class MessageService {
  private prisma = new PrismaClient();
  constructor(private ticketsService: TicketsService) {}

  public async create(message: MessageWithStatusDto): Promise<Message> {
    const ticket = await this.ticketsService.findFirst(message.ticketId);
    if(ticket.status !== message.status) {
      let ticket = await this.ticketsService.changeStatus(message.ticketId, message.status);
    }
    const newMessage: Prisma.MessageUncheckedCreateInput = {
      content: message.content,
      repliedMessageId: message.repliedMessageId,
      ticketId: message.ticketId,
      time: new Date(),
      userId: message.user.id
    }
    return this.prisma.message.create({ data: { ...newMessage } });
  }

  public findMessage(id: number) {
    return this.prisma.message.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  public findLastUserMessage(userId: string) {
    return this.prisma.message.findFirst({ where: { userId } });
  }

  public listMessagesByTicket(ticketId: number) {
    return this.prisma.message.findMany({ where: { ticketId } });
  }
}
