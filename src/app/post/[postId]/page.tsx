import Image from "next/image";
import autherIcon from './../../../../public/icon.png'
import getBlog from './getBlog';
import styles from './../../globals.module.css';
import formatContent from "@/functions/formatContent";
import TopicPath from "@/components/TopicPath";
import AutherProfile from "./_components/AutherProfile";
import SideBlogs from "./_components/SideBlogs";
import OtherBlogs from "./_components/OtherBlogs";

const Content = ({ blogData }: { blogData: blog }) => {
  const pathData = [
    {
      name: "ホーム",
      href: "/"
      },
    {
      name: blogData.title,
      href: null,
    }
  ]
  return(
    <div>
      <div className={styles.sidePadding}>
        <TopicPath path={pathData} />
        <h1 className='text-4xl font-bold my-4'>{blogData.title}</h1>
        <div className='flex items-center mt-8 mb-16'>
          <Image
            src={autherIcon}
            alt='AIおじさん'
            width={40}
            height={40}
            className="bg-gray-500 rounded-full mr-4"
            />
          <div>
            <p  className=''>AIおじさん</p>
            <p className='leading-0 opacity-60'>{`${blogData.publishedAt.getFullYear()}/${blogData.publishedAt.getMonth() + 1}/${blogData.publishedAt.getDate()} ${String(blogData.publishedAt.getHours()).padStart(2, '0')}:${String(blogData.publishedAt.getMinutes()).padStart(2, '0')}`}</p>
          </div>
        </div>
        <div className="mb-16">
        <p className="whitespace-pre-wrap">{formatContent(blogData.body)}</p>
        </div>
      </div>
      <hr />
      <div className={styles.sidePadding}>
        <AutherProfile />
      </div>
      <hr />
      <OtherBlogs currendId={blogData.id} />
      <hr className="mb-16" />
      <div className={styles.sidePadding}>
        <TopicPath path={pathData} />
      </div>
    </div>
  )
}

const Post = async ({ params }: { params: { postId: string } }) => {
  const blog = await getBlog(params.postId ?? "");
  return (
    <main className={styles.main}>
      <div className={styles.centerContent}>
      { blog
        ? <Content blogData={blog} />
        : <p>
            <strong>記事が見つかりません。</strong>
          </p>
        }
      </div>
    </main>
  )
}

export default Post;
