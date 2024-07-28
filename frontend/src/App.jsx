import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './pages/Layout'
import { UserContextProvider } from './contexts/UserContext'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import EditPost from './pages/EditPost'
import AdminIndex from './admin/AdminIndex'
import AdminPosts from './admin/AdminPosts'
import AdminUsers from './admin/AdminUsers'
import AdminPanel from './admin/AdminPanel'

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

          <Route path='/admin' element={ <AdminPanel /> }>
            <Route index element={<AdminIndex />} />  {/* Default route */}
            <Route path='all-users' element={<AdminUsers />} />
            <Route path='all-posts' element={<AdminPosts />} />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>

  )
}

export default App
