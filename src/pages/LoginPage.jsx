import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

function LoginPage() {
  const navigate = useNavigate()
  const { session, isAuthLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isAuthLoading && session) {
      navigate('/admin', { replace: true })
    }
  }, [session, isAuthLoading, navigate])

  async function handleSubmit(event) {
    event.preventDefault()
    try {
      setIsLoading(true)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }
      
      navigate('/admin')
    } catch (error) {
      console.error(error)
      alert(error.message || '登入失敗')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-105 rounded-2xl border border-[#E0E4E8] bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-[#041627]">
          DigiCard Admin
        </h1>

        <p className="mt-2 text-sm text-[#677489]">
          登入後台以管理電子名片。
        </p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#44474c]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#E0E4E8] px-3 text-sm outline-none focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#44474c]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="h-11 w-full rounded-lg border border-[#E0E4E8] px-3 text-sm outline-none focus:border-[#041627] focus:ring-2 focus:ring-[#041627]/10"
              placeholder="請輸入密碼"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 w-full rounded-xl bg-[#041627] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1a2b3c] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? '登入中...' : '登入'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage