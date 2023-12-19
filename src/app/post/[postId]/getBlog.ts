"use server"

const getBlog = async (blogId: string) => {
  try {
    const response = await fetch(`${process.env.HOST_NAME}/api/get-blog/${blogId}`);
    const result = await response.json();
    const formatedData = result.data ? result.data as blog : null;

    const fixTimeDifference = (originalDate: Date) => {
      const TIME_DIFFERENCE = 9;
      const publishedDate = new Date(originalDate);
      publishedDate.setHours(publishedDate.getHours() + TIME_DIFFERENCE);
      return publishedDate;
    }
    const blog = formatedData && {
      id: formatedData.id,
      title: formatedData.title,
      body: formatedData.body,
      publishedAt: fixTimeDifference(formatedData.publishedAt),
    }
    return blog;
  } catch (e) {
    console.error(e, "Faild to get Blog.");
    return null;
  }
}

export default getBlog;