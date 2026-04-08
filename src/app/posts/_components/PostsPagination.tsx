import Link from 'next/link';

import { getPageHref, getPaginationItems } from '@/functions/posts/pagination';

interface Props {
  currentPage: number;
  totalPages: number;
}

const paginationItemBaseClassName =
  'inline-flex min-h-10 min-w-10 items-center justify-center rounded px-3 py-2 font-semibold transition-colors';
const paginationItemBorderClassName = 'border border-[rgb(var(--border-color-rgb))]';
const currentPaginationItemBorderClassName = 'border-2 border-[rgb(var(--border-color-rgb))]';

const PostsPagination = ({ currentPage, totalPages }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label='記事一覧のページネーション' className='mt-6'>
      <ul className='flex flex-wrap items-center justify-center gap-2'>
        {getPaginationItems(currentPage, totalPages).map((item) => {
          if (typeof item !== 'number') {
            return (
              <li key={item}>
                <span className='inline-flex min-h-10 min-w-10 items-center justify-center px-1 text-[rgb(var(--foreground-rgb))] opacity-60'>
                  …
                </span>
              </li>
            );
          }

          const isCurrentPage = item === currentPage;

          return (
            <li key={item}>
              {isCurrentPage ? (
                <span
                  aria-current='page'
                  className={`${paginationItemBaseClassName} ${currentPaginationItemBorderClassName} bg-[rgb(var(--hover-background-start-rgb))] text-[rgb(var(--foreground-rgb-bold))]`}
                >
                  {item}
                </span>
              ) : (
                <Link
                  href={getPageHref(item)}
                  className={`${paginationItemBaseClassName} ${paginationItemBorderClassName} text-[rgb(var(--foreground-rgb-bold))] hover:bg-[rgb(var(--hover-background-start-rgb))]`}
                >
                  {item}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default PostsPagination;
