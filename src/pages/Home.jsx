import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/Layout'

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Franco Bonafina",
    "jobTitle": "Tech Lead",
    "sameAs": [
      "https://linkedin.com/in/fbonafina"
    ]
  }

  return (
    <>
      <Helmet>
        <title>Franco Bonafina - Tech Lead | Technology, Product and Business Impact</title>
        <meta name="description" content="Franco Bonafina is a Tech Leader focused on building the bridge between technology, product, and business growth through scalable platforms and strategic execution." />
        <meta property="og:title" content="Franco Bonafina - Tech Lead | Technology, Product and Business Impact" />
        <meta property="og:description" content="Franco Bonafina is a Tech Leader focused on building the bridge between technology, product, and business growth." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://franbonafina.github.io" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Layout>
        <article style={{ 
          fontFamily: 'Georgia, "Times New Roman", serif',
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{ 
            padding: '40px 0'
          }}>
            <p style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '19px',
              lineHeight: '1.6',
              color: '#333333',
              marginBottom: '32px',
              fontWeight: '400'
            }}>
              I'm passionate about building the bridge between technology, product, and business growth. 
              For more than a decade, I've worked at the intersection of engineering execution and commercial strategy; translating complex business problems into scalable platforms and product initiatives that drive revenue, improve retention, and create long-term competitive advantage.
            </p>
            
            <p style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '19px',
              lineHeight: '1.6',
              color: '#333333',
              marginBottom: '40px',
              fontWeight: '400'
            }}>
              My work is focused on helping organizations turn technical capabilities into real business outcomes, aligning teams, stakeholders, and technology around a shared vision of growth and innovation.
            </p>
            
            <div style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              display: 'inline-block',
              textAlign: 'center'
            }}>
              <Link 
                to="/blog"
                style={{
                  fontSize: '14px',
                  color: '#121212',
                  textDecoration: 'none',
                  fontStyle: 'italic',
                  letterSpacing: '0.3px',
                  fontWeight: '400',
                  padding: '8px 16px',
                  border: '1px solid #d2d2d7',
                  borderRadius: '4px',
                  backgroundColor: '#f8f8f8',
                  transition: 'all 0.2s ease',
                  display: 'inline-block'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e8e8e8'
                  e.target.style.borderColor = '#121212'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f8f8f8'
                  e.target.style.borderColor = '#d2d2d7'
                }}
              >
                Opinion →
              </Link>
            </div>
          </div>
        </article>
      </Layout>
    </>
  )
}

export default Home
