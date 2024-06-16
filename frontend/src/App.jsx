import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './pages/Layout'
import { UserContextProvider } from './contexts/UserContext'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/create-post' element={ <CreatePost /> } />
          <Route path='/post/:id' element={ <PostDetail /> } />
          <Route path='/edit/:id' element={ <EditPost /> } />
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
