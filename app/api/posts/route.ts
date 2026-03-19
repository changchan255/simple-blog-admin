import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPosts, createPost, updatePost } from "@/lib/posts";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const posts = await getPosts();
  return Response.json(posts);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newPost = await createPost(body);

  return Response.json(newPost);
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await updatePost(body);
    return Response.json({ message: "Post updated" });
}
