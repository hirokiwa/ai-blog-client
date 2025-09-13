"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ItemLink = {
  kind: "link";
  label: string;
  href: string;
  icon: ReactNode;
};

type ItemButton = {
  kind: "button";
  label: string;
  onClick: ComponentProps<"button">["onClick"];
  icon: ReactNode;
};

export type ShareButtonsViewProps = {
  headingId?: string;
  items: ReadonlyArray<ItemLink | ItemButton>;
};

export const ShareButtonsView = ({ headingId = "share-heading", items }: ShareButtonsViewProps) => (
  <nav aria-labelledby={headingId} className="flex flex-col items-center gap-4">
    <h2 id={headingId} className="text-sm">
      この記事をシェアする
    </h2>

    <ul role="list" className="flex justify-center">
      {items.map((item, i) => (
        <li key={i}>
          {item.kind === "link" ? (
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex flex-col items-center gap-1 w-20
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                transition
              "
            >
              <span
                aria-hidden="true"
                className="rounded-full overflow-hidden bg-gray-100 w-[32px] h-[32px] flex items-center justify-center
                           transition-transform duration-200 ease-in-out group-hover:scale-110 group-focus:scale-110"
              >
                {item.icon}
              </span>
              <span className="text-xs">
                {item.label}
                <span className="sr-only">（新しいタブで開きます）</span>
              </span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={item.onClick}
              className="
                group flex flex-col items-center gap-1 w-20
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                transition
              "
              aria-label={`${item.label}を開く`}
            >
              <span
                aria-hidden="true"
                className="rounded-full overflow-hidden bg-gray-100 w-[32px] h-[32px] flex items-center justify-center
                           transition-transform duration-200 ease-in-out group-hover:scale-110 group-focus:scale-110"
              >
                {item.icon}
              </span>
              <span className="text-xs">{item.label}</span>
            </button>
          )}
        </li>
      ))}
    </ul>
  </nav>
);
