import { Routes, Route } from 'react-router-dom'
import CardPage from './pages/public/PublicCardPage'
import SharePage from './pages/public/CardSharePage'
import PreviewPage from './pages/admin/CardPreviewPage'
import CardFormPage from './pages/admin/CardFormPage'
import AdminPage from './pages/admin/AdminDashboardPage'
import LoginPage from './pages/auth/LoginPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AuthRedirect from './components/auth/AuthRedirect'

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthRedirect />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/cards/new" element={<CardFormPage />} />
      <Route path="/admin/cards/:id/edit" element={<CardFormPage />} />
      <Route path='/card/:slug' element={<CardPage />} />
      <Route path="/card/:slug/share" element={<SharePage />} />
      <Route path="/admin/cards/:id/preview" element={<PreviewPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cards/new"
        element={
          <ProtectedRoute>
            <CardFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cards/:id/edit"
        element={
          <ProtectedRoute>
            <CardFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/cards/:id/preview"
        element={
          <ProtectedRoute>
            <PreviewPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
