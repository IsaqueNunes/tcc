import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TicketsService } from '@tcc/tickets';
import { UserService } from '@tcc/user';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) { }

  async validateUser({ email, displayName }: { email: string; displayName: string }) {
    const user = await this.usersService.findByEmail(email);

    if (user) return user;
    return this.usersService.create({
      name: displayName, email,

    });
  }

  findUser(id: string) {
    return this.usersService.find(id);
  }

  async login({email, name}:{email: string; name: string}): Promise<any>{
    const userExists = await this.usersService.findByEmail(email);
    if(!userExists) {
      const newUser: Prisma.UserCreateInput = {
        email: email,
        name: name
      }
      this.usersService.create(newUser);
      return newUser;
    }

    return userExists;
  }

}
