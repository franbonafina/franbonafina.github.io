import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Layout from '../components/Layout'
import { getAllPosts } from '../utils/posts'

const Blog = () => {
  const posts = getAllPosts()

  return (
    <>
      <Helmet>
        <title>Opinion - Franco Bonafina</title>
        <meta name="description" content="Thoughts on technology, product, and business impact by Franco Bonafina. Expert insights on AI product development, team structure, and technology leadership." />
        <meta name="keywords" content="technology blog, AI product development, team structure, leadership, Franco Bonafina, opinion, tech insights" />
        <meta name="author" content="Franco Bonafina" />
        <link rel="canonical" href="https://franbonafina.github.io/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Franco Bonafina" />
        <meta property="og:url" content="https://franbonafina.github.io/blog" />
        <meta property="og:title" content="Opinion - Franco Bonafina" />
        <meta property="og:description" content="Thoughts on technology, product, and business impact by Franco Bonafina. Expert insights on AI product development, team structure, and technology leadership." />
        <meta property="og:image" content="https://franbonafina.github.io/assets/posts/01_learning_curve.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://franbonafina.github.io/blog" />
        <meta property="twitter:title" content="Opinion - Franco Bonafina" />
        <meta property="twitter:description" content="Thoughts on technology, product, and business impact by Franco Bonafina. Expert insights on AI product development, team structure, and technology leadership." />
        <meta property="twitter:image" content="https://franbonafina.github.io/assets/posts/01_learning_curve.png" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Opinion - Franco Bonafina",
            "description": "Thoughts on technology, product, and business impact by Franco Bonafina",
            "url": "https://franbonafina.github.io/blog",
            "author": {
              "@type": "Person",
              "name": "Franco Bonafina",
              "url": "https://franbonafina.github.io"
            },
            "publisher": {
              "@type": "Person",
              "name": "Franco Bonafina"
            },
            "inLanguage": "en-US",
            "blogPost": posts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "image": `https://franbonafina.github.io${post.image}`,
              "datePublished": new Date(post.date).toISOString(),
              "url": `https://franbonafina.github.io/blog/${post.slug}`
            }))
          })}
        </script>
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
      </Helmet>
      
      <Layout>
        <header style={{ 
          textAlign: 'center', 
          padding: '60px 0',
          borderBottom: '1px solid #e5e5e7',
          marginBottom: '30px'
        }}>
          <div style={{ 
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '13px',
            color: '#999999',
            fontStyle: 'italic',
            marginBottom: '12px',
            letterSpacing: '0.3px'
          }}>
            Opinion
          </div>
        </header>
        
        <main style={{ maxWidth: '680px', margin: '0 auto' }}>
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              style={{ 
                borderBottom: index < posts.length - 1 ? '1px solid #e5e5e7' : 'none',
                padding: '35px 0',
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start'
              }}
            >
              {post.image && (
                <div style={{ 
                  flex: '0 0 200px',
                  height: '133px',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  backgroundColor: '#f5f5f7'
                }}>
                  <img 
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(1.05)'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)'
                    }}
                  />
                </div>
              )}
              
              <div style={{ flex: '1', minWidth: '0' }}>
                <time style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '13px',
                  color: '#999999',
                  fontStyle: 'italic',
                  marginBottom: '8px',
                  display: 'block',
                  letterSpacing: '0.3px'
                }}>
                  {new Date(post.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </time>
                
                <h2 style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#121212',
                  marginBottom: '12px',
                  lineHeight: '1.2',
                  letterSpacing: '-0.3px'
                }}>
                  <Link 
                    to={`/blog/${post.slug}`}
                    style={{ 
                      color: 'inherit', 
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = '#0071e3'
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = '#121212'
                    }}
                  >
                    {post.title}
                  </Link>
                </h2>
                
                <p style={{ 
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  color: '#333333',
                  marginBottom: '0',
                  fontWeight: '400'
                }}>
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </main>
      </Layout>
    </>
  )
}

export default Blog
