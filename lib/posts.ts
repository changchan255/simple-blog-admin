import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data/posts.json");

export async function getPosts() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function getPost(id: string) {
  const posts = await getPosts();
  return posts.find((p: any) => p.id === id);
}

export async function createPost(data: any) {
  const posts = await getPosts();

  const maxId = posts.length
    ? Math.max(...posts.map((p: any) => Number(p.id)))
    : 0;

  const newPost = {
    id: (maxId + 1).toString(),
    ...data,
  };

  const updated = [...posts, newPost];

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));

  return newPost;
}

export async function updatePost(data: any) {
  const posts = await getPosts();

  const updated = posts.map((p: any) =>
    p.id === data.id ? { ...p, ...data } : p
  );

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
}

export async function deletePost(id: string) {
  const posts = await getPosts();

  const updated = posts.filter((p: any) => p.id !== id);

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
}
