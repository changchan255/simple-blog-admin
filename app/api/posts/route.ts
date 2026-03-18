export async function GET() {
  return Response.json([
    { id: "1", title: "Post 1" },
    { id: "2", title: "Post 2" },
  ]);
}
