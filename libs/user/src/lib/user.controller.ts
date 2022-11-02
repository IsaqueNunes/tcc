import {
  Body,
  Controller, Delete, Get, Param, Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  public create(@Body() { name, email }: Prisma.UserCreateInput) {
    return this.userService.create({
      name, email,
    });
  }

  @Get(':id')
  public find(@Param('id') id: string) {
    return this.userService.find(id);
  }

  @Get()
  public list() {
    return this.userService.list();
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
