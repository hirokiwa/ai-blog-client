import Link from "next/link";

const Footer = () => (
  <div className='text-center my-12 sticky top-[100vh] opacity-70'>
    <div className="my-8">
      <Link
        href='/contact'
        className='hover:underline hover:opacity-70 text-sm'
        title='お問い合わせ'
        aria-label='お問い合わせ'
      >お問い合わせ</Link>
    </div>
    <p>関西弁でお届けする AIおじさん毎日ブログ</p>
    <small>&copy; project AI Guy 2023</small>
  </div>
)

export default Footer;