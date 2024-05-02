import '../../_styles/Header.scss';
import Link from 'next/link';

const Header:React.FC = () => {
  return (
    <>
      <header className="header">
        <Link href="/">Blog</Link>
        <Link href="/contact">お問い合わせ</Link>
      </header>
    </>
  )
}

export default Header;