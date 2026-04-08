export const dynamic = 'force-dynamic';

import AnimationMessage from '@/components/AnimationMessage';
import PostsContent from './_components/PostsContent';
import { normalizePage } from '@/functions/posts/pagination';

interface PostsProps {
  searchParams?: {
    page?: string | string[];
  };
}

const Posts = async ({ searchParams }: PostsProps) => {
  const isPublished = process.env.IS_PUBLISHED === "true";
  const page = normalizePage(searchParams?.page);

  return (
    isPublished
      ? <PostsContent page={page} />
      : <AnimationMessage message='now developing...'/>
  )
}

export default Posts;
