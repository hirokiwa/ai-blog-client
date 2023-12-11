import { useEffect, useState } from "react"

const useAllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get-all`);
        const result = await response.json();
        setAllBlogs(JSON.stringify(result));
      } catch (e) {
        console.error(e, "Faild to get get All Blogs.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { allBlogs, loading }
}

export default useAllBlogs;