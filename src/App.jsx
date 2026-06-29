import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CardPage from './pages/CardPage'
import SharePage from './pages/SharePage'
import PreviewPage from './pages/PreviewPage'
import CardFormPage from './pages/CardFormPage'
import AdminPage from './pages/AdminPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/cards/new" element={<CardFormPage />} />
        <Route path="/admin/cards/:id/edit" element={<CardFormPage />} />
        <Route path='/card/:slug' element={<CardPage />} />
        <Route path="/card/:slug/share" element={<SharePage />} />
        <Route path="/admin/cards/:id/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
