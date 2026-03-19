import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data/users.json");

export async function getUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function findUser(username: string) {
  const users = await getUsers();
  return users.find((u: any) => u.username === username);
}

export async function createUser(data: any) {
  const users = await getUsers();

  const exists = users.find((u: any) => u.username === data.username);
  if (exists) {
    throw new Error("User already exists");
  }

  const maxId = users.length
    ? Math.max(...users.map((u: any) => Number(u.id)))
    : 0;

  const newUser = {
    id: (maxId + 1).toString(),
    role: "admin",
    ...data,
  };

  const updated = [...users, newUser];

  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));

  return newUser;
}
