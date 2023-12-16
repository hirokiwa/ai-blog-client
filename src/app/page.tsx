import styles from './page.module.css'
import Image from "next/image";
import autherIcon from './../../public/icon.png'
import Link from 'next/link';
import getAllBlogs from './getAllBlogs';

const Top = async () => {
  const isPublished = process.env.IS_PUBLISHED === "true";
  const allBlogs = isPublished ? await getAllBlogs() : null;
  return (
    <main className={styles.main}>
      {isPublished && <>
        { allBlogs
          ? <div>
            {allBlogs.map((a) => (
              <Link href={`/post/${a.id}`} key={a.id}>
                <div>
                  <div>
                    <Image
                      src={autherIcon}
                      alt='AIおじさん'
                      width={30}
                      style={{
                        backgroundColor: "gray",
                        borderRadius: "50%",
                      }}
                      />
                      <p>AIおじさん</p>
                      <p>{ `${a.publishedAt.getFullYear()}/${a.publishedAt.getMonth()+1}/${a.publishedAt.getDate()} ${String(a.publishedAt.getHours()).padStart(2, '0')}:${String(a.publishedAt.getMinutes()).padStart(2, '0')}` }</p>
                  </div>
                  <h2>{a.title}</h2>
                    <p>{`${a.body.slice( 0, 30 )}...`}</p>
                </div>
              </Link>
            ))}
          </div>
          : <p>
              <strong>記事が見つかりません。</strong>
            </p>
          }
        </>}
      {
        !isPublished && <p>now developing...</p>
      }
    </main>
  )
}

export default Top;