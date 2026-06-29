import AdminSidebar from './AdminSidebar'

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#1A2B3C]">
      <div className="flex min-h-screen">
        <AdminSidebar />

        <main className="flex min-h-screen flex-1 flex-col">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout