"use server"

const getAllBlogs = async () => {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/api/get-all-blog`);
    const result = await response.json();
    const formatedResult = result.data ? result.data.map((d: any): blog => {
      const TIME_DIFFERENCE = 9;
      const publishedDate = new Date(d.publishedAt);
      publishedDate.setHours(publishedDate.getHours() + TIME_DIFFERENCE);
      return ({
        id: d.id,
        title: d.title,
        body: d.body,
        publishedAt: publishedDate,
      })
    }) as blog[] : null;
    return formatedResult && formatedResult.length > 0
      ? formatedResult
      : null;
  } catch (e) {
    console.error(e, "Faild to get get All Blogs.");
    return null;
  }
}

export default getAllBlogs;