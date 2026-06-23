import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreatePage from './pages/CreatePage'
import CardPage from './pages/CardPage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreatePage />}></Route>
        <Route path='/card' element={<CardPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
