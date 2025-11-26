import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import { MainView } from './views/MainView'
import { ModulesView } from './views/ModulesView'
import { ProgressView } from './views/ProgressView'
import { StudentsView } from './views/StudentsView'
import { ContentView } from './views/ContentView'
import { ProtectedRoute } from './components/ProtectedRoute';
import NotFoundView from './views/NotFoundView';
import DashboardView from './views/DashboardView';
import StudentsListView from './views/StudentsListView';
import { ConfigurationView } from './views/ConfigurationView'

function App() {
  return (
    <>
      <div className='h-screen w-screen bg-[#0D1B2A]'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <MainView />
              </ProtectedRoute>
            } />
            <Route path="modulos" element={
              <ProtectedRoute>
                <ModulesView />
              </ProtectedRoute>
            } />
            <Route path="progreso" element={
              <ProtectedRoute>
                <ProgressView />
              </ProtectedRoute>
            } />
            <Route path='estudiante' element={
              <ProtectedRoute>
                <StudentsView />
              </ProtectedRoute>
            } />
            <Route path="contenido/:name/:idModulo/:idSubmodulo" element={
              <ProtectedRoute>
                <ContentView />
              </ProtectedRoute>
            } />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            } />
            <Route path="listado-estudiantes" element={
              <ProtectedRoute>
                <StudentsListView />
              </ProtectedRoute>
            } />
            <Route path="configuracion" element={
              <ProtectedRoute>
                <ConfigurationView />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  )
}

export default App
