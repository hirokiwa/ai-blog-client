const getAllBlogs = async () => {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/api/get-all-blog`);
    const result = await response.json();
    const formatedResult = result.data ? result.data.map((d: any): blog => {
      return ({
        id: d.id,
        title: d.title,
        body: d.body,
        publishedAt: new Date(d.publishedAt),
      })
    }) as blog[] : null;
    return formatedResult;
  } catch (e) {
    console.error(e, "Faild to get get All Blogs.");
    return null;
  }
}

export default getAllBlogs;