import '../_styles/Sidebar.scss';
import Link from 'next/link';

const Sidebar:React.FC = () => {
  return (
    <>
      <div className="sidebar">
        <ul>
          <li><Link className="list" href={`/admin/posts`}>記事一覧</Link></li>
          <li><Link className="list" href={`/admin/categories`}>カテゴリー一覧</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar;