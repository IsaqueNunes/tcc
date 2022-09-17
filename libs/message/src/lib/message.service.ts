import { Injectable } from '@nestjs/common';
import { Message, Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class MessageService {
  private prisma = new PrismaClient();

  public create(message: Prisma.MessageUncheckedCreateInput): Promise<Message> {
    return this.prisma.message.create({ data: { ...message } });
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
