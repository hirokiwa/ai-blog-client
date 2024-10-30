export const dynamic = 'force-dynamic';

import styles from './globals.module.css'
import Image from "next/image";
import topImage from './../../public/top-image.png'
import getRecentBlogs from '@/functions/getRecentBlogs';
import AnimationMessage from '@/components/AnimationMessage';
import BlogContainer from './_components/BlogContainer';

const Content = async () => {
  const recentBlogs =  await getRecentBlogs();
  return (
    <main className={styles.main}>
      <div className={`${styles.centerContent} mb-16`}>
        <Image
          alt='AIおじさん毎日ブログ'
          src={topImage}
          className='mb-12 bg-gray-100'
        />
        {recentBlogs
          ? <BlogContainer blogData={recentBlogs}/>
          : <p>
              <strong>記事が見つかりません。</strong>
            </p>
        }
        {
          recentBlogs && 
          <div className='flex flex-col items-center pt-16'>
            <a
                href="/posts"
                aria-label='記事一覧'
                title='記事一覧'
                className='bg-rose-600 px-12 py-4 rounded-md relative flex gap-2 items-center'
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-400h160v-80H400v80Zm0-120h320v-80H400v80Zm0-120h320v-80H400v80Zm-80 400q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-560h80v560h560v80H160Zm160-720v480-480Z"/></svg>
                <p className='text-lg font-semibold text-white'>記事一覧</p>
            </a>
          </div>
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
