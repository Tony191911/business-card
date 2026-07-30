import { Link, useLocation } from 'react-router-dom'
import { Contact, Settings } from 'lucide-react'

function AdminSidebar() {
    const location = useLocation()
    const isCardManagement = location.pathname === '/' || location.pathname.startsWith('/admin')

    return (
        <aside className="admin-sidebar hidden px-4 py-6 md:block">
          <div className="mb-16 flex items-center gap-3 px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#041627] text-xl font-bold text-white">
              D
            </div>

            <div>
              <h1 className="text-xl font-semibold text-[#041627]">
                DigiCard Admin
              </h1>
              <p className="mt-1 text-sm text-[#677489]">電子名片管理</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              to="/admin"
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold ${
                isCardManagement
                  ? 'border-[#041627] bg-[#f3f4f5] text-[#041627]'
                  : 'border-transparent text-[#677489] hover:bg-[#f3f4f5]'
              }`}
            >
              <Contact size={20} />
              名片管理
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#041627] hover:bg-[#f3f4f5]"
            >
              <Settings size={20} />
              系統設定
            </button>
          </nav>
        </aside>
    );
}

export default AdminSidebar