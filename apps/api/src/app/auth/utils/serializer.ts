import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: Error, payload: User) => void,
  ) {
    const user = await this.authService.findUser(payload.id);

    return user ? done(null, user) : done(null, null);
  }
}
