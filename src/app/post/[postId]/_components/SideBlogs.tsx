import Link from 'next/link';

interface Props {
  previousBlog: blog | null;
  nextBlog: blog | null;
}

const SideBlogs = async ({previousBlog, nextBlog}: Props) => {
  if (!previousBlog && !nextBlog) {
    return null;
  }

  return (
    <div className="flex items-center">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className="w-1/2">
        { previousBlog &&
          <Link
            href={`/post/${previousBlog.id}`}
            title={previousBlog.title}
            aria-label={previousBlog.title}
            className="w-full flex justify-start items-center hoverdBackgroundColor py-8 hover:opacity-70 group"
          >
            <span className="material-symbols-outlined">navigate_before</span>
            <div className="mx-2">
              <p className="opacity-70">前の記事</p>
              <p className="group-hover:underline">{previousBlog.title}</p>
            </div>
          </Link>
        }
      </div>
      <div className="h-16 verticalBar"></div>
      <div className="w-1/2">
        { nextBlog &&
          <Link
            href={`/post/${nextBlog.id}`}
            title={nextBlog.title}
            aria-label={nextBlog.title}
            className="w-full flex justify-end items-center hoverdBackgroundColor py-8 hover:opacity-70 group"
          >
            <div className="mx-2 text-right">
              <p className="opacity-70">次の記事</p>
              <p className="group-hover:underline">{nextBlog.title}</p>
            </div>
            <span className="material-symbols-outlined">navigate_next</span>
          </Link>
        }
      </div>
    </div>
  )
}

export default SideBlogs;