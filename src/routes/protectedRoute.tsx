import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const isAuthenticated = !!localStorage.getItem('session')

  // Se tiver token, renderiza a página, senão leva pra página login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
