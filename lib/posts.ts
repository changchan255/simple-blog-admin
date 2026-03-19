import { prisma } from "./prisma";

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(id: string | undefined) {
  if (!id) return null; 

  const postId = Number(id);
  if (isNaN(postId)) return null; 

  return prisma.post.findUnique({
    where: { id: postId },
  });
}

 export async function createPost(data: any) {
  const { authorId, ...rest } = data;

  if (!authorId) {
    throw new Error("authorId is missing");
  }

  return prisma.post.create({
    data: {
      ...rest,
      author: {
        connect: { id: Number(authorId) },
      },
    },
  });
}

export async function updatePost(data: any) {
  const { id, ...rest } = data;
  return prisma.post.update({
    where: { id: Number(id) },
    data: rest,
  });
}

export async function deletePost(id: string) {
  return prisma.post.delete({
    where: { id: Number(id) },
  });
}
