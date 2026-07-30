import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function ProtectedRoute({ children }) {
  const { session, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-[#677489]">驗證登入狀態中...</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute