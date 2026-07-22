import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function AuthRedirect() {
  const { session, isAuthLoading } = useAuth()

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa]">
        <p className="text-sm text-[#677489]">讀取登入狀態中...</p>
      </div>
    )
  }

  return session ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/login" replace />
  )
}

export default AuthRedirect
