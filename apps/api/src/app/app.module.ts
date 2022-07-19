import { Module } from '@nestjs/common';

import { UserController, UserService } from '@tcc/user';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
