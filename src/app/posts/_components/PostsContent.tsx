import TopicPath from '@/components/TopicPath';
import BlogContainer from '@/app/_components/BlogContainer';
import getPostsPage from '@/functions/posts/getPostsPage';

import styles from '../../globals.module.css';
import PostsPagination from './PostsPagination';

interface Props {
  page: number;
}

const pathData = [
  {
    name: 'ホーム',
    href: '/',
  },
  {
    name: '記事一覧',
    href: null,
  },
];

const PostsContent = async ({ page }: Props) => {
  const postsPage = await getPostsPage(page);

  return (
    <main className={styles.main}>
      <div className={`${styles.centerContent} flex flex-col gap-4`}>
        <div>
          <TopicPath path={pathData} />
        </div>
        <div>
          {postsPage && postsPage.totalBlogs > 0 ? (
            <>
              <PostsPagination
                currentPage={postsPage.currentPage}
                totalPages={postsPage.totalPages}
              />
              <BlogContainer blogData={postsPage.blogs} label='記事一覧' />
              <PostsPagination
                currentPage={postsPage.currentPage}
                totalPages={postsPage.totalPages}
              />
            </>
          ) : (
            <p>
              <strong>記事が見つかりません。</strong>
            </p>
          )}
        </div>
        <div>
          <TopicPath path={pathData} />
        </div>
      </div>
    </main>
  );
};

export default PostsContent;
