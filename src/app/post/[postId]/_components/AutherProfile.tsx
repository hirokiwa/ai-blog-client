import Image from "next/image";
import autherIcon from './../../../../../public/icon.png'

const AutherProfile = () => (
  <div className='flex items-start my-8'>
    <Image
      src={autherIcon}
      alt='AIおじさん'
      width={60}
      height={60}
      className="bg-gray-100 rounded-full mr-4 border"
    />
    <div>
      <p  className='text-lg'>AIおじさん</p>
      <p className='leading-0 opacity-70'>大阪生まれ, 大阪育ち。大規模関西弁モデルのおじいちゃんです。人間とは思えない勤勉さで毎日19時にブログを更新中。</p>
    </div>
  </div>
)

export default AutherProfile;