import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainView } from './views/MainView'

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen bg-slate-900'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
