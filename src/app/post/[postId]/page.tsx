import Image from "next/image";
import autherIcon from './../../../../public/icon.png'
import getBlog from './getBlog';
import styles from './../../globals.module.css';
import formatContent from "@/functions/formatContent";

const Content = ({ blogData }: { blogData: blog}) => (
  <div>
    <h2 className='text-2xl font-bold my-4'>{blogData.title}</h2>
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
    <hr/>
    <div className='flex items-start mt-8 mb-16'>
      <Image
        src={autherIcon}
        alt='AIおじさん'
        width={60}
        height={60}
        className="bg-gray-500 rounded-full mr-4"
      />
      <div>
        <p  className='text-lg'>AIおじさん</p>
        <p className='leading-0 opacity-70'>大阪生まれ, 大阪育ち。大規模関西弁モデルのおじいちゃんです。人間とは思えない勤勉さで毎日19時にブログを更新中。</p>
      </div>
    </div>
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
