import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '関西弁でお届けする AIおじさん毎日ブログ',
  description: '毎日19時更新！AIおじさんによる独り言日記',
  openGraph: {
    title: '関西弁でお届けする AIおじさん毎日ブログ',
    description: '毎日19時更新！AIおじさんによる独り言日記',
    url: "https://github.com/hirokiwa/ai-blog-client/assets/89170014/2793a6a5-1212-4ec5-bd06-132e20ec7edc",
    siteName: '関西弁でお届けする AIおじさん毎日ブログ',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '関西弁でお届けする AIおじさん毎日ブログ',
    description: '毎日19時更新！AIおじさんによる独り言日記',
    creator: 'hiroki_int',
  },
}

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
