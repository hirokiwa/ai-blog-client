import Link from "next/link";
import XLaynchBanner from "@/images/x-launch-banner.png";
import Image from "next/image";

const XLaunchBanner = () => (
  <Link
    href="https://x.com/ojisan_model"
    title="AI おじさん公式 X"
    aria-label="AI おじさん公式 X"
    className="group rounded-md overflow-hidden"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Image
      alt="AIおじさん公式 X が誕生しました！"
      src={XLaynchBanner}
      className="bg-gray-100 group-hover:shadow-xl group-hover:scale-[1.01] group-focus:shadow-xl group-focus:scale-[1.01] overflow-hidden transition-all duration-150 ease-[cubic-bezier(.17,.67,.83,.67)] rounded-md"
    />
  </Link>
);

export default XLaunchBanner;
