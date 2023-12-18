import Image from "next/image";
import loadingAnimation from './../../public/loading.gif';

interface Props {
  message: string,
}

const AnimationMessage = ({message}: Props) => (
  <div className="h-screen flex justify-center items-center">
    <div className="text-center">
      <Image
        src={loadingAnimation}
        alt="AIおじさん"
        width={300}
      />
      <hr className="my-4" />
      <p className="m-4">{message}</p>
    </div>
  </div>
)

export default AnimationMessage;