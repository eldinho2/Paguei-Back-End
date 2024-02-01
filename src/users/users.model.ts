import { Prisma } from "@prisma/client";

export class User implements Prisma.UserCreateInput {
  email: string;
  name: string;
  picture: string;
}