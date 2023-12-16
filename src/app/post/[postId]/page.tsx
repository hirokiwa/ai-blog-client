"use client"

import styled from 'styled-components';
import Image from "next/image";
import autherIcon from './../../../../public/icon.png'
import useGetBlog from './useGetBlog';

export default function Page({ params }: { params: { postId: string } }) {
  const { blog, isLoading } = useGetBlog({blogId: params.postId});
  
  return (
    <>
      { isLoading && <p>Loading...</p> }
      { blog &&
        <BlogContainer>
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
            <p>{ `${blog.publishedAt.getFullYear()}/${blog.publishedAt.getMonth()+1}/${blog.publishedAt.getDate()} ${String(blog.publishedAt.getHours()).padStart(2, '0')}:${String(blog.publishedAt.getMinutes()).padStart(2, '0')}` }</p>
        <h2>{blog.title}</h2>
        <p style={{whiteSpace: 'pre-wrap'}}>{blog.body}</p>
        </BlogContainer>
      }
    </>
  )
}

const BlogWrapper = styled.div`
  margin: 1em 0;
  border-bottom: 1px solid;
`

const BlogContainer = styled.div`
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
