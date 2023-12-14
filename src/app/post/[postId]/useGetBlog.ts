import { useEffect, useState } from "react"

interface Props{
  blogId: string
}

const useGetBlog = ({blogId}: Props) => {
  const [blog, setAllBlogs] = useState<blog | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const startLoading = () => { setIsLoading(true); }
  const endLoading = () => { setIsLoading(false); }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const response = await fetch(`/api/get-blog/${blogId}`);
        const result = await response.json();
        const formatedData = result.data ? result.data as blog : null;
        const blog = formatedData && {
          id: formatedData.id,
          title: formatedData.title,
          body: formatedData.body,
          publishedAt: new Date(formatedData.publishedAt),
        }
        setAllBlogs(blog);
        endLoading();
        return blog;
      } catch (e) {
        console.error(e, "Faild to get Blog.");
      }
    };
    fetchData();
  }, [blogId]);

  return { blog, isLoading }
}

export default useGetBlog;