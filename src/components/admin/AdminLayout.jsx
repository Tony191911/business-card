import Wrapper from '../../style/AdminLayoutWrapper'
import AdminSidebar from './AdminSidebar'

function AdminLayout({ children }) {
  return (
    <Wrapper>
      <AdminSidebar />

      <div className="admin-content">
        {children}
      </div>
    </Wrapper>
  )
}

export default AdminLayout
