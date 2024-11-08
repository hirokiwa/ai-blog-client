export const dynamic = 'force-dynamic';

import styles from '../globals.module.css'
import getAllBlogs from '../../functions/getAllBlogs';
import AnimationMessage from '@/components/AnimationMessage';
import BlogContainer from '../_components/BlogContainer';
import TopicPath from '@/components/TopicPath';
import XLaunchBanner from '../_components/XLaunchBanner';
import ReturnToTopButton from '../_components/ReturnToTopButton';

const Content = async () => {
  const allBlogs = await getAllBlogs();
  const pathData = [
    {
      name: "ホーム",
      href: "/"
      },
    {
      name: '記事一覧',
      href: null,
    }
  ]
  return (
    <main className={styles.main}>
      <div className={`${styles.centerContent} flex flex-col gap-4`}>
        <div>
          <TopicPath path={pathData} />
        </div>
        <div className="px-2 pb-4">
          <XLaunchBanner/>
        </div>
        <div>
          {allBlogs
            ? <BlogContainer blogData={allBlogs} label='記事一覧'/>
            : <p>
                <strong>記事が見つかりません。</strong>
              </p>
          }
        </div>
        <div>
          <TopicPath path={pathData} />
        </div>
      </div>
      <div className={`${styles.centerContent} sticky bottom-4 z-10 flex justify-end pr-1 pointer-events-none`}>
        <ReturnToTopButton/>
      </div>
    </main>
  )
}

const Posts = async () => {
  const isPublished = process.env.IS_PUBLISHED === "true";
  return (
    isPublished
      ? <Content />
      : <AnimationMessage message='now developing...'/>
  )
}

export default Posts;