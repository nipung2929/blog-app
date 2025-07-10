import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Blog } from './pages/Blog'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Blogs } from './components/Blogs'
import { Publish } from './pages/Publish'
import LandingPage from './pages/LandingPage'
import { UserBlogs } from './pages/UserBlogs'


function App() {
  

  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path = "/" element={<LandingPage />}></Route>
      <Route path = "/signup" element={<Signup />}></Route>
      <Route path = "/signin" element={<Signin />}></Route>
      <Route path = "/blog/:id" element={<Blog />}></Route>
      <Route path = "/blogs" element={<Blogs />}></Route>
      <Route path="/publish" element={<Publish />} />
      <Route path="/user-blogs" element={<UserBlogs />} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
