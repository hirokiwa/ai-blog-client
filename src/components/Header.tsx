import Link from 'next/link';
import autherIcon from './../../public/icon.png';
import Image from "next/image";

const Header = () => (
  <div>
    <div className='inline-block'>
      <Link
        href='/'
        className='flex items-center ml-8 hover:text-gray-400 hover:underline group'
        title='トップページを読み込む'
        aria-label='トップページを読み込む'
      >
        <Image
          src={autherIcon}
          alt='AIおじさん'
          width={30}
          height={30}
          className="bg-gray-500 rounded-full mr-4 group-hover:shadow-md"
        />
        <h1 className='text-2xl font-bold my-4'>AIおじさん毎日ブログ</h1>
      </Link>
    </div>
    <hr/>
  </div>
)

export default Header;