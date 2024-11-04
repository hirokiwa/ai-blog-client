import { getMockBlogById } from "./getMockBlogById";
import * as blogModule from "./getMockBlogs";

describe("getMockBlogById", () => {
  const sampleBlogs = [
    { id: "1", title: "Blog 1", body: "Content 1", publishedAt: new Date() },
    { id: "2", title: "Blog 2", body: "Content 2", publishedAt: new Date() },
    { id: "3", title: "Blog 3", body: "Content 3", publishedAt: new Date() },
  ];

  beforeEach(() => {
    jest.spyOn(blogModule, "getMockBlogs").mockReturnValue(sampleBlogs);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return the correct blog when blogId is '1'", () => {
    const result = getMockBlogById("1");
    expect(result).toEqual(sampleBlogs[0]);
  });

  it("should return undefined when blogId does not exist", () => {
    const result = getMockBlogById("non-existent-id");
    expect(result).toBeUndefined();
  });
});
