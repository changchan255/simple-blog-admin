jest.mock("next-auth", () => ({
  getServerSession: jest.fn(() =>
    Promise.resolve({ user: { name: "Admin" } })
  ),
}));

import { render, screen } from "@testing-library/react";
import PostCard from "@/app/components/PostCard";

describe("PostCard", () => {
  it("renders post title", () => {
    render(<PostCard post={{ id: "1", title: "Post #1" }} />);

    expect(screen.getByText(/Post #1/)).toBeInTheDocument();
  });

  it("has link to detail page", () => {
    render(<PostCard post={{ id: "2", title: "Post #2" }} />);

    const link = screen.getByRole("link", {
      name: /post #2/i,
    });

    expect(link).toHaveAttribute("href", "/posts/2");
  });
});
