import { Module } from '@nestjs/common';

import { UserController, UserService } from '@tcc/user';
import { TicketsController, TicketsService } from '@tcc/tickets';
import { MessageService } from 'libs/message/src/lib/message.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from '../../../../libs/message/src/lib/message.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, TicketsController, MessageController],
  providers: [AppService, UserService, TicketsService, MessageService],
  })
export class AppModule { }
