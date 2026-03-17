import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Header = () => {
  const [imageError, setImageError] = useState(false)

  return (
    <header className="header" style={{ textAlign: 'left', padding: '60px 0', marginBottom: '0px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
        marginBottom: '8px'
      }}>
        <Link 
          to="/"
          style={{ position: 'relative', display: 'inline-block', textDecoration: 'none' }}
        >
          <div className="profile-photo" style={{ margin: '0', cursor: 'pointer' }}>
            {!imageError ? (
              <img 
                src="/assets/me.png" 
                alt="Franco Bonafina" 
                onError={() => setImageError(true)}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              'FB'
            )}
          </div>
          <div style={{ 
            position: 'absolute', 
            bottom: '-5px', 
            right: '-5px',
            background: '#fff',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <a 
              href="https://linkedin.com/in/fbonafina" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                color: '#0077b5',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#005885'
              }}
              onMouseOut={(e) => {
                e.target.style.color = '#0077b5'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </Link>
      </div>
      
      <h1 className="name" style={{ textAlign: 'left', marginBottom: '2px' }}>Franco Bonafina</h1>
      <p className="headline" style={{ textAlign: 'left', fontStyle: 'italic', marginBottom: '2px' }}>Tech Lead | Driving Technology, Product and Business Impact</p>
    </header>
  )
}

export default Header
