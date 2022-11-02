import {
  Body, Controller, Get, Param, Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MessageService } from './message.service';
import { MessageWithStatusDto } from 'libs/models/message-with-status-dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) { }

  @Post()
  public create(@Body() { content, userId, ticketId, status}: MessageWithStatusDto) {
    return this.messageService.create({ content, userId, ticketId: +ticketId, status });
  }

  @Get(':id')
  public findMessage(@Param('id') id: string) {
    return this.messageService.findMessage(+id);
  }

  @Get(':userId')
  public findLastUserMessage(@Param('userId') userId: string) {
    return this.messageService.findLastUserMessage(userId);
  }

  @Get(':ticketId')
  public listMessagesByTicket(@Param('ticketId') ticketId: string) {
    return this.messageService.listMessagesByTicket(+ticketId);
  }
}
