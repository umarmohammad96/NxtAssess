import {Routes, Route} from 'react-router'
import LoginForm from './components/LoginForm'
import {Navigate} from 'react-router'
import Home from './components/Home'
// import Header from './components/Header'
// import NotFound from './components/NotFound'
import Assessment from './components/Assessment'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Result from './components/Result'

const App = () => {
  return (
    <>
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
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
