import styles from './globals.module.css'
import Image from "next/image";
import topImage from './../../public/top-image.png'
import getAllBlogs from './getAllBlogs';
import AnimationMessage from '@/components/AnimationMessage';
import BlogContainer from './_components/BlogContainer';


const Content = async () => {
  const allBlogs =  await getAllBlogs();
  return (
    <main className={styles.main}>
      <div className={styles.centerContent}>
        <Image
          alt='AIおじさん毎日ブログ'
          src={topImage}
          className='mb-12 bg-gray-500'
        />
        {allBlogs
          ? <BlogContainer blogData={allBlogs}/>
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