import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/googleAuth.guard';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return { msg: 'login' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async register() {
    return { msg: 'ok' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) return { msg: 'Authenticated' };
    else return { msg: 'Not authenticated' };
  }
}
