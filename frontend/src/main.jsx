import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignUp from './pages/SignUp.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/signup' element={<SignUp />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
)
