import {Routes, Route} from 'react-router'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Assessment from './components/Assessment'
import Result from './components/Result'
import ProtectedRoute from './components/ProtectedRoute'
import EvaluationProvider from './context/EvaluationProvider'
import './App.css'

const App = () => {
  return (
    <EvaluationProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <Assessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </EvaluationProvider>
  )
}

export default App
