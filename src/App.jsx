import {useInRouterContext, BrowserRouter, Routes, Route} from 'react-router'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import Assessment from './components/Assessment'
import Result from './components/Result'
import ProtectedRoute from './components/ProtectedRoute'
import EvaluationProvider from './context/EvaluationProvider'
import './App.css'

const AppRoutes = () => (
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
        path="/results"
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

const App = () => {
  const inRouterContext = useInRouterContext()

  if (inRouterContext) {
    return <AppRoutes />
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
