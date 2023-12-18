import Image from "next/image";
import autherIcon from './../../../../public/icon.png'
import getBlog from './getBlog';
import styles from './../../globals.module.css';

const Post = async ({ params }: { params: { postId: string } }) => {
  const blog = await getBlog(params.postId ?? "");
  
  return (
    <main className={styles.main}>
      <div className={styles.centerContent}>
      { blog
        ? <div>
          <Image
            src={autherIcon}
            alt='AIおじさん'
            width={30}
            className="bg-gray-500 rounded-full"
            />
            <p>AIおじさん</p>
            <p>{ `${blog.publishedAt.getFullYear()}/${blog.publishedAt.getMonth()+1}/${blog.publishedAt.getDate()} ${String(blog.publishedAt.getHours()).padStart(2, '0')}:${String(blog.publishedAt.getMinutes()).padStart(2, '0')}` }</p>
        <h2>{blog.title}</h2>
        <p className="whitespace-pre-wrap">{blog.body}</p>
        </div>
        : <p>
            <strong>記事が見つかりません。</strong>
          </p>
        }
      </div>
    </main>
  )
}

export default Post;
