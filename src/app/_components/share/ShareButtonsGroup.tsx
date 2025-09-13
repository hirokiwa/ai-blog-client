"use client";

import { useMemo } from "react";
import Image from "next/image";
import { buildShareData } from "./share.build";
import { buildLineMsgHref, buildXIntentHref } from "./share.adapters";
import { ShareButtonsView } from "./ShareButtonsView";
import xIcon from './../../../../public/x-icon.svg'
import LineIcon from './../../../../public/line-icon.svg'

type Props = {
  blogTitle: string;
  blogId: string;
  onOtherShareClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  baseOrigin?: string;
  campaign?: string;
};

export const ShareButtonsGroup = ({
  blogTitle,
  blogId,
  onOtherShareClick,
  baseOrigin,
  campaign,
}: Props) => {
  const share = useMemo(
    () => buildShareData({ blogTitle, blogId, baseOrigin, campaign }),
    [blogTitle, blogId, baseOrigin, campaign]
  );

  const handleOtherShare =
    onOtherShareClick ??
    (async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: document.title,
            text: share.text.other,
            url: share.url.other,
          });
          return;
        } catch {}
      } else {
        try {
          await navigator.clipboard.writeText(share.url.other);
          alert("記事URLをクリップボードにコピーしました。");
          return;
        } catch {
          alert();
        };
      };
    });

  const items = [
    {
      kind: "link" as const,
      label: "X (Twitter)",
      href: buildXIntentHref(share),
      newTab: true,
      icon: (
        <Image
          src={xIcon}
          alt=""
          width={32}
          height={32}
          className="bg-gray-100"
        />
      ),
    },
    {
      kind: "link" as const,
      label: "LINE",
      href: buildLineMsgHref(share),
      newTab: true,
      icon: (
        <Image
          src={LineIcon}
          alt=""
          width={32}
          height={32}
          className="bg-gray-100"
        />
      ),
    },
    {
      kind: "button" as const,
      label: "その他",
      onClick: handleOtherShare,
      icon: (
        <span
          className="w-[32px] h-[32px] flex items-center justify-center bg-red-500"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 -960 960 960"
            focusable="false"
          >
            <path fill="#ffffff" d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
          </svg>
        </span>
      ),
    },
  ] as const;

  return <ShareButtonsView items={items} />;
};
