import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import CardPage from './pages/CardPage'
import SharePage from './pages/SharePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePage />} />
        <Route path='/card/:slug' element={<CardPage />} />
        <Route path="/card/:slug/share" element={<SharePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
