import Wrapper from '../../assets/wrappers/AdminLayout'
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