"use client"

import styled from 'styled-components';
import styles from './page.module.css'
import useAllBlogs from './useAllBlogs';
import Image from "next/image";
import autherIcon from './../../public/icon.png'

export default function Home() {
  const { allBlogs, isLoading } = useAllBlogs();
  
  return (
    <main className={styles.main}>
      { isLoading && <p>Loading...</p> }
      { allBlogs &&
        <BlogsContainer>
          {allBlogs.map((a) => (
            <BlogWrapper key={a.id}>
              <AutherWrapper>
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
              </AutherWrapper>
              <h2>{a.title}</h2>
                <PreBody>{`${a.body.slice( 0, 30 )}...`}</PreBody>
            </BlogWrapper>
          ))}
        </BlogsContainer>
      }
    </main>
  )
}

const BlogWrapper = styled.div`
  margin: 1em 0;
  border-bottom: 1px solid;
`

const BlogsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const AutherWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1em 0;
`

const PreBody = styled.p`
  text-overflow: ellipsis;
`
