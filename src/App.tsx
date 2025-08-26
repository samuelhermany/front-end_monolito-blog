import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'

import './global.css'

export function App() {
  return (
    <BrowserRouter basename="/front-end_monolito-blog">
      <Router />
    </BrowserRouter>
  )
}
