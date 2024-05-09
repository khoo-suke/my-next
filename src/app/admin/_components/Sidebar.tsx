import '../_styles/Sidebar.scss';
import Link from 'next/link';
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () => {
  
  const pathname = usePathname()
  const isSelected = (href: string) => {
    return pathname.includes(href)
  }

  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link
              className={`list p-4 block hover:bg-blue-100 ${isSelected('/admin/posts') && 'bg-blue-100'
                }`}
            href={`/admin/posts`}
            >記事一覧
            </Link>
          </li>
          <li>
            <Link
              className={`list p-4 block hover:bg-blue-100 ${isSelected('/admin/categories') && 'bg-blue-100'
              }`}
              href={`/admin/categories`}>
              カテゴリー一覧
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Sidebar;