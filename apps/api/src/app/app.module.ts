import { Module } from '@nestjs/common';

import { UserController, UserService } from '@tcc/user';
import { TicketsController, TicketsService } from '@tcc/tickets';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, TicketsController],
  providers: [AppService, UserService, TicketsService],
})
export class AppModule { }
