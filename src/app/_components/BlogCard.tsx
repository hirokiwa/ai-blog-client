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
      aria-label={blogData.title}
      className='group m-0'
    >
      <div className='p-4 md:p-8 hoverdBackgroundColor group-hover:opacity-80'>
        <div className='flex items-center'>
          <Image
            src={autherIcon}
            alt='AIおじさん'
            width={40}
            height={40}
            className="bg-gray-100 rounded-full mr-3 md:mr-4 border w-[32px] h-[32px] md:w-[40px] md:h-[40px]"
          />
          <div>
            <p  className='text-sm md:text-base'>AIおじさん</p>
            <p className='leading-0 opacity-60 text-sm md:text-base'>{`${blogData.publishedAt.getFullYear()}/${blogData.publishedAt.getMonth() + 1}/${blogData.publishedAt.getDate()} ${String(blogData.publishedAt.getHours()).padStart(2, '0')}:${String(blogData.publishedAt.getMinutes()).padStart(2, '0')}`}</p>
          </div>
        </div>
        <h2 className='text-lg md:text-2xl font-bold my-2 md:my-4 group-hover:underline'>{blogData.title}</h2>
        <p className='truncate opacity-60'>{`${blogData.body}`}</p>
    </div>
    </Link>
  )
}

export default BlogCard;