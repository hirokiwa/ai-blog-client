import styles from './page.module.css'
import Image from "next/image";
import autherIcon from './../../public/icon.png'
import Link from 'next/link';
import getAllBlogs from './getAllBlogs';
import loadingAnimation from './../../public/loading.gif';

const Content = async () => {
  const allBlogs =  await getAllBlogs();
  return (
    <main className={styles.main}>
      {allBlogs
        ? <div>
          {allBlogs.map((a) => (
            <Link href={`/post/${a.id}`} key={a.id}>
              <div>
                <div>
                  <Image
                    src={autherIcon}
                    alt='AIおじさん'
                    width={30}
                    className="bg-gray-500 rounded-full"
                  />
                  <p>AIおじさん</p>
                  <p>{`${a.publishedAt.getFullYear()}/${a.publishedAt.getMonth() + 1}/${a.publishedAt.getDate()} ${String(a.publishedAt.getHours()).padStart(2, '0')}:${String(a.publishedAt.getMinutes()).padStart(2, '0')}`}</p>
                </div>
                <h2>{a.title}</h2>
                <p>{`${a.body.slice(0, 30)}...`}</p>
              </div>
            </Link>
          ))}
        </div>
        : <p>
          <strong>記事が見つかりません。</strong>
        </p>
      }
    </main>
  )
}

const Developing = () => (
  <div className="h-screen flex justify-center items-center">
  <div className="text-center">
    <Image
      src={loadingAnimation}
      alt="AIおじさん"
      width={300}
    />
    <hr className="my-4" />
    <p className="m-4">now developing...</p>
  </div>
</div>

)

const Top = async () => {
  const isPublished = process.env.IS_PUBLISHED === "true";
  return (
    isPublished
      ? <Content />
      : <Developing/>
  )
}

export default Top;