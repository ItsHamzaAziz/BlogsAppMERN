import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './pages/Layout'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
