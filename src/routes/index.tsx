import { Routes, Route } from 'react-router-dom'

import { GeometricTypes } from '../pages/GeometricTypes'

import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ProtectedRoute } from './protectedRoute.js'
// import { Upload } from '../pages/Upload/index.jsx'

export function Router() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* samuelhermany1012@gmail.com */}
      {/* Rotas privadas */}
      <Route element={<ProtectedRoute />}>
        <Route index element={<GeometricTypes />} />
      </Route>
    </Routes>
  )
}
