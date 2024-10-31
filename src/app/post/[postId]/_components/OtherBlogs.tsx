import getAllBlogs from "@/functions/getAllBlogs";
import Link from 'next/link';
import SideBlogs from "./SideBlogs";
import BlogContainer from "@/app/_components/BlogContainer";
import XLaunchBanner from "@/app/_components/XLaunchBanner";

interface Props {
  currendId: string;
}

const OtherBlogs = async ({currendId}: Props) => {
  const allBlogs = await getAllBlogs();
  if (!allBlogs) {
    return null;
  }
  const currendIndex = allBlogs.findIndex((a) => a.id === currendId);
  const previousBlog = currendIndex !== -1 ? allBlogs[currendIndex + 1] : null;
  const nextBlog = currendIndex !== -1 ? allBlogs[currendIndex - 1] : null;

  const recommendBlogs = allBlogs.filter((a) => {
    const blogIdToRemove = [currendId, previousBlog?.id, nextBlog?.id]
    return !blogIdToRemove.includes(a.id);
  }).slice(0, 3);

  return (
    <>
      <SideBlogs
        previousBlog={previousBlog}
        nextBlog={nextBlog}
      />
      <hr />
      <div className="py-12">
        <XLaunchBanner/>
        </div>
      {recommendBlogs.length > 0 &&
        <>
          <BlogContainer
            blogData={recommendBlogs}
            label="おすすめの記事"
          />
        </>
      }
    </>
  )
}

export default OtherBlogs;