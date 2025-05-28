import { PrismaService } from "../prisma.service";
import { User } from "./users.model";
import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private wakeStatus: boolean = false;

  async getUser(email: string) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exists) {
      return true;
    }

    return false;
  }

  async getAllUser(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async createUser(data: User): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const newUser = await this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        image: data.image,
        wakeStatus: false
      } as Prisma.UserCreateInput,
    });

    return newUser;
  }

  async getWakeStatus() {
    return this.wakeStatus;
  }

  async setWakeStatus(status: boolean) {
    this.wakeStatus = status;
    return this.wakeStatus;
  }
}