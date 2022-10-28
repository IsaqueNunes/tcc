import { Injectable } from '@nestjs/common';
import { UserService } from '@tcc/user';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) { }

  async validateUser({ email, displayName }: { email: string; displayName: string }) {
    const user = await this.usersService.find(email);

    if (user) return user;
    return this.usersService.create({ name: displayName, email });
  }

  findUser(id: string) {
    return this.usersService.find(id);
  }
}
