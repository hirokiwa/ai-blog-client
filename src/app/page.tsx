"use client"

import styles from './page.module.css'
import useAllBlogs from './useAllBlogs';

export default function Home() {
  const { allBlogs } = useAllBlogs();
  return (
    <main className={styles.main}>
      <p>now developing...</p>
      <p>{ allBlogs }</p>
    </main>
  )
}
