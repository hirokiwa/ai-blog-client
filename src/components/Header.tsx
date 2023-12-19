import autherIcon from './../../public/icon.png';
import Image from "next/image";

const Header = () => (
  <div className=''>
    <div className='flex items-center ml-8'>
      <Image
          src={autherIcon}
          alt='AIおじさん'
          width={30}
          height={30}
          className="bg-gray-500 rounded-full mr-4"
        />
      <h1 className='text-2xl font-bold my-4'>AIおじさん毎日ブログ</h1>
    </div>
    <hr/>
  </div>
)

export default Header;