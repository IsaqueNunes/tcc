import { Module } from '@nestjs/common';

import { UserController, UserService } from '@tcc/user';
import { TicketsController, TicketsService } from '@tcc/tickets';
import { MessageService, MessageController } from '@tcc/message';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController, UserController, TicketsController, MessageController],
  providers: [AppService, UserService, TicketsService, MessageService],
})
export class AppModule { }
