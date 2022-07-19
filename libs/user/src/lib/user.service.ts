import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserService {
  private prisma = new PrismaClient();

  public create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: { ...user } });
  }

  public find(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public list(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public remove(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
