import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function AdminHeader({ title, subtitle, backTo, status, children, }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-3">
      <div className="flex items-center gap-3">
        {backTo && (
          <Link
            to={backTo}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#44474c] transition-colors hover:bg-[#f3f4f5]"
            aria-label="返回"
          >
            <ArrowLeft size={22} />
          </Link>
        )}

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-[#041627]">
              {title}
            </h1>

            {status && (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  status === 'published'
                    ? 'bg-green-50 text-green-600'
                    : status === 'archived'
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-orange-50 text-orange-500'
                }`}
              >
                {status === 'published'
                  ? '已發布'
                  : status === 'archived'
                  ? '封存'
                  : '草稿'}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-1 text-sm text-[#677489]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {children && <div>{children}</div>}
    </header>
  )
}

export default AdminHeader