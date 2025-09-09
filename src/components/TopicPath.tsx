import Link from 'next/link';

interface Props {
  path: {
    name: string;
    href: string | null;
  }[]
}

const TopicPath = ({path}: Props) => {
  return (
    <div className="flex items-center">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      {
        path.map((p, i) => {
          return (
            <div
              className="flex items-center opacity-70"
              key={`path${i}`}
            >
              {i !==0 && <span className="material-symbols-outlined">navigate_next</span>}
              {p.href
                ? <Link
                    href={p.href}
                    className="underline hover:opacity-50 truncate max-w-[24ch] sm:max-w-[48ch]"
                    title={p.name}
                    aria-label={p.name}
                  >
                    {p.name}
                  </Link>
                : <p className='truncate max-w-[24ch] sm:max-w-[48ch]'>{p.name}</p>
              }
            </div>
        )})
      }
    </div>
  )
}

export default TopicPath;