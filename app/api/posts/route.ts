let posts = [
  { id: '1', title: 'Post 1', content: 'Demo' },
  { id: '2', title: 'Post 2', content: 'Demo' },
];

export async function GET() {
  return Response.json(posts);
}

export async function POST(req: Request) {
  const body = await req.json();

  const maxId = posts.length
    ? Math.max(...posts.map((p) => Number(p.id)))
    : 0;

  const newPost = {
    id: (maxId + 1).toString(),
    ...body,
  };

  posts.push(newPost);

  return Response.json(newPost);
}

export async function PUT(req: Request) {
  const body = await req.json();

  posts = posts.map((p) =>
    p.id === body.id ? { ...p, ...body } : p
  );

  return Response.json({ success: true });
}
