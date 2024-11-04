import { getMockBlogs, repeatBlogs } from "./getMockBlogs";
import mockBlogsJson from "./mockBlogs.json";

describe("repeatBlogs", () => {
  const sampleBlogs: blog[] = [
    { id: "1", title: "Blog 1", body: "Content 1", publishedAt: new Date() },
    { id: "2", title: "Blog 2", body: "Content 2", publishedAt: new Date() },
    { id: "3", title: "Blog 3", body: "Content 3", publishedAt: new Date() },
  ];

  it("should return an empty array if limit is zero", () => {
    const limit = 0;
    const result = repeatBlogs({ blogs: sampleBlogs, limit });
    expect(result).toEqual([]);
  });

  it("should return the exact number of blogs when limit matches the blogs length", () => {
    const limit = sampleBlogs.length;
    const result = repeatBlogs({ blogs: sampleBlogs, limit });
    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(sampleBlogs[index].title);
      expect(blog.body).toBe(sampleBlogs[index].body);
      expect(blog.publishedAt).toEqual(sampleBlogs[index].publishedAt);
    });
  });

  it("should return the correct number of repeated blogs when limit exceeds the blogs length", () => {
    const limit = 10;
    const result = repeatBlogs({ blogs: sampleBlogs, limit });
    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      const originalIndex = index % sampleBlogs.length;
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(sampleBlogs[originalIndex].title);
      expect(blog.body).toBe(sampleBlogs[originalIndex].body);
      expect(blog.publishedAt).toEqual(sampleBlogs[originalIndex].publishedAt);
    });
  });

  it("should return a limited number of blogs if limit is less than the blogs length", () => {
    const limit = 2;
    const result = repeatBlogs({ blogs: sampleBlogs, limit });
    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(sampleBlogs[index].title);
      expect(blog.body).toBe(sampleBlogs[index].body);
      expect(blog.publishedAt).toEqual(sampleBlogs[index].publishedAt);
    });
  });
});

describe("getMockBlogs", () => {
  it("should return all mock blogs if limit is not specified", () => {
    const result = getMockBlogs();
    const expectedBlogs = mockBlogsJson.blogs.map((b, index) => ({
      ...b,
      id: (index + 1).toString(),
      publishedAt: expect.any(Date),
    }));
    expect(result).toEqual(expectedBlogs);
  });

  it("should return a limited number of blogs if limit is specified", () => {
    const limit = 5;
    const result = getMockBlogs(limit);
    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(mockBlogsJson.blogs[index].title);
      expect(blog.body).toBe(mockBlogsJson.blogs[index].body);
      expect(blog.publishedAt).toBeInstanceOf(Date);
    });
  });

  it("should return blogs with correct data if limit matches the total number of blogs", () => {
    const limit = mockBlogsJson.blogs.length;
    const result = getMockBlogs(limit);
    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(mockBlogsJson.blogs[index].title);
      expect(blog.body).toBe(mockBlogsJson.blogs[index].body);
      expect(blog.publishedAt).toBeInstanceOf(Date);
    });
  });

  it("should repeat blogs to match the specified limit if limit exceeds the total number of blogs", () => {
    const limit = mockBlogsJson.blogs.length * 3 + 1;
    const result = getMockBlogs(limit);
    const mockDataLength = mockBlogsJson.blogs.length;

    expect(result).toHaveLength(limit);
    result.forEach((blog, index) => {
      const originalIndex = index % mockDataLength;
      expect(blog.id).toBe((index + 1).toString());
      expect(blog.title).toBe(mockBlogsJson.blogs[originalIndex].title);
      expect(blog.body).toBe(mockBlogsJson.blogs[originalIndex].body);
      expect(blog.publishedAt).toBeInstanceOf(Date);
    });
  });

  it("should return an empty array if limit is zero", () => {
    const limit = 0;
    const result = getMockBlogs(limit);
    expect(result).toEqual([]);
  });
});
