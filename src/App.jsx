import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import CardPage from './pages/CardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePage />} />
        <Route path='/card/:slug' element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
