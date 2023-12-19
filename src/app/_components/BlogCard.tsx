import Image from "next/image";
import autherIcon from './../../../public/icon.png'
import Link from 'next/link';

interface Props {
  blogData: blog;
}

const BlogCard = ({blogData}: Props) => {
  return (
    <Link
      href={`/post/${blogData.id}`}
      title={blogData.title}
      className='py-8'
    >
      <div className='my-8 mx-8'>
        <div>
          <div className='flex items-center'>
            <Image
              src={autherIcon}
              alt='AIおじさん'
              width={40}
              height={40}
              className="bg-gray-500 rounded-full mr-4"
            />
            <div>
              <p  className=''>AIおじさん</p>
              <p className='leading-0'>{`${blogData.publishedAt.getFullYear()}/${blogData.publishedAt.getMonth() + 1}/${blogData.publishedAt.getDate()} ${String(blogData.publishedAt.getHours()).padStart(2, '0')}:${String(blogData.publishedAt.getMinutes()).padStart(2, '0')}`}</p>
            </div>
          </div>
          <h2 className='text-2xl font-bold my-4'>{blogData.title}</h2>
          <p className='truncate'>{`${blogData.body}`}</p>
        </div>
    </div>
    </Link>
  )
}

export default BlogCard;