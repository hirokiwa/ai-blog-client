import styles from './globals.module.css'
import Image from "next/image";
import autherIcon from './../../public/icon.png'
import Link from 'next/link';
import getAllBlogs from './getAllBlogs';
import AnimationMessage from '@/components/AnimationMessage';

interface Props {
  blogData: blog;
}

const BlogCard = ({blogData}: Props) => {
  return (
    <div className='my-8 mx-8'>
      <Link
        href={`/post/${blogData.id}`}
        title={blogData.title}
        className='my-8'
        >
        <div>
          <div className='flex items-center'>
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
          <h2 className='text-2xl font-bold my-4'>{blogData.title}</h2>
          <p className='truncate'>{`${blogData.body}`}</p>
        </div>
      </Link>
    </div>
  )
}

const Content = async () => {
  const allBlogs =  await getAllBlogs();
  return (
    <main className={styles.main}>
      <div className={styles.centerContent}>
        {allBlogs
          ? allBlogs.map((a) => (
            <div key={a.id}>
              <BlogCard blogData={a} />
              <hr/>
            </div>
            ))
          : <p>
              <strong>記事が見つかりません。</strong>
            </p>
        }
      </div>
    </main>
  )
}

const Top = async () => {
  const isPublished = process.env.IS_PUBLISHED === "true";
  return (
    isPublished
      ? <Content />
      : <AnimationMessage message='now developing...'/>
  )
}

export default Top;