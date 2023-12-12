"use client"

import styles from './page.module.css'
import useAllBlogs from './useAllBlogs';

export default function Home() {
  const { allBlogs, isLoading } = useAllBlogs();
  return (
    <main className={styles.main}>
      { isLoading && <p>Loading...</p> }
      { allBlogs && allBlogs.map((a) => (
        <div key={a.id}>
          <h2>{ a.title }</h2>
          <p>{ a.body }</p>
        </div>
      ))}
    </main>
  )
}