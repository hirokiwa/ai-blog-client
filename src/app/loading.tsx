"use client"
import styles from './page.module.css'
import Image from "next/image";
import handsUp from './../../public/loading.gif'

const Loading = () => (
  <main className={styles.main}>
    <Image
      src={handsUp}
      alt={"AIおじさん"}
      width={300}
    ></Image>
  </main>
)

export default Loading;