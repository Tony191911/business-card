import { Routes, Route } from 'react-router-dom'
import CardPage from './pages/CardPage'
import SharePage from './pages/SharePage'
import PreviewPage from './pages/PreviewPage'
import CardFormPage from './pages/CardFormPage'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/Admin/ProtectedRoute'
import AuthRedirect from './components/AuthRedirect'

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
