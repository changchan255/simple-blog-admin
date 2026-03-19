/**
 * @jest-environment node
 */

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve({ user: { name: "Admin" } })
  ),
}));

import { GET } from "../app/api/posts/route";

describe("GET /api/posts", () => {
  it("returns list of posts", async () => {

    const res = await GET();

    const data = await res.json();

    expect(Array.isArray(data)).toBe(true);

    if (data.length > 0) {
      expect(data[0]).toHaveProperty("id");
      expect(data[0]).toHaveProperty("title");
        expect(data[0]).toHaveProperty("content");
    }
  });
});
