import { useEffect, useMemo, useState } from "react"

const useAllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<blog[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const startLoading = () => { setIsLoading(true); }
  const endLoading = () => { setIsLoading(false); }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        startLoading();
        const response = await fetch(`/api/get-all`);
        const result = await response.json();
        const formatedResult = result.data ? result.data as blog[] : null;
        setAllBlogs(formatedResult ?? null);
        endLoading();
        return formatedResult;
      } catch (e) {
        console.error(e, "Faild to get get All Blogs.");
      }
    };
    fetchData();
  }, []);

  return { allBlogs, isLoading }
}

export default useAllBlogs;