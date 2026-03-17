import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/Layout'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Franco Bonafina</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>404</h1>
          <p style={{ fontSize: '18px', marginBottom: '32px', color: '#666' }}>
            Page not found
          </p>
          <Link to="/" className="link">
            Return Home
          </Link>
        </div>
      </Layout>
    </>
  )
}

export default NotFound
