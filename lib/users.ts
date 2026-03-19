import { prisma } from "./prisma";

export async function createUser(data: any) {
  return prisma.user.create({
    data,
  });
}

export async function getUser(username: string) {
  return prisma.user.findUnique({
    where: { username },
  });
}
