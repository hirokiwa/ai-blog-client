import Image from "next/image";
import autherIcon from './../../../../public/icon.png'
import getBlog from './getBlog';
import styles from './../../globals.module.css';

const Content = ({ blogData }: { blogData: blog}) => (
  <div>
    <h2 className='text-2xl font-bold my-4'>{blogData.title}</h2>
    <div className='flex items-center my-4'>
      <Image
        src={autherIcon}
        alt='AIおじさん'
        width={40}
        height={40}
        className="bg-gray-500 rounded-full mr-4"
      />
      <div>
        <p  className=''>AIおじさん</p>
        <p className='leading-0'>{`${blogData.publishedAt.getFullYear()}/${blogData.publishedAt.getMonth() + 1}/${blogData.publishedAt.getDate()} ${String(blogData.publishedAt.getHours()).padStart(2, '0')}:${String(blogData.publishedAt.getMinutes()).padStart(2, '0')}`}</p>
      </div>
    </div>
    <p className="whitespace-pre-wrap ">{blogData.body}</p>
  </div>
)

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
