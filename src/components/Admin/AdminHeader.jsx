import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, LogOut } from 'lucide-react'
import { supabase } from '../../lib/supabaseClient'

function AdminHeader({ title, subtitle, backTo, status, children, }) {
  const navigate = useNavigate()

  async function handleLogout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error(error)
      alert(error.message || '登出失敗')
      return
    }
    navigate('/login', { replace: true })
  }

  return (
    <header className="flex items-center justify-between border-b border-[#E0E4E8] bg-white px-6 py-3">
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

      <div className="flex items-center gap-3">
        {children}

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-[#E0E4E8] px-3 py-2 text-sm font-semibold text-[#677489] transition-colors hover:bg-[#f3f4f5]"
        >
          <LogOut size={17} />
          登出
        </button>
      </div>
    </header>
  )
}

export default AdminHeader