import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { MainView } from './views/MainView'
import { ModulesView } from './views/ModulesView'
import { ProgressView } from './views/ProgressView'
import { StudentsView } from './views/StudentsView'
import { ContentView } from './views/ContentView'

function App() {

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen bg-[#0D1B2A]'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="modulos" element={<ModulesView/>}/>
            <Route path="progreso" element={<ProgressView />} />
            <Route path='estudiante' element={<StudentsView/>}/>
            <Route path="contenido" element={<ContentView />} />
            <Route path="*" element={<MainView />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
