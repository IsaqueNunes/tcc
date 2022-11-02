import {
  Body,
  Controller, Get, Post, Req, UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/googleAuth.guard';
import { OAuth2Client} from 'google-auth-library';
import { AuthService } from './auth.service';

const client = new OAuth2Client(
  process.env.GOOGLE_AUTH_CLIENT_ID,
  process.env.GOOGLE_AUTH_CLIENT_SECRET);

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}



  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async handleLogin() {
    return { msg: 'login' };
  }

  @Post('login')
  async login(@Body('token') token): Promise<any> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const data = this.authService.login({
      email: payload.email,
      name: payload.name});

    return data;
  }


  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async register() {
    return { msg: 'ok' };
  }

  @Get('status')
  user(@Req() request: Request) {
    if (request.user) return { msg: 'Authenticated' };
    return { msg: 'Not authenticated' };
  }
}
