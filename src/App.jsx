import { Routes, Route, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Post from './pages/Post'
import NotFound from './pages/NotFound'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    // Handle spa-github-pages redirect
    const query = window.location.search
    if (query.includes('?/')) {
      const path = query.replace('?', '')
      navigate(path, { replace: true })
    }
  }, [navigate])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
