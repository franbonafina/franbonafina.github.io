import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import { getPostBySlug } from '../utils/posts'

const Post = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isReading, setIsReading] = useState(false)
  const [speechRate, setSpeechRate] = useState(0.9)
  const [speechPitch, setSpeechPitch] = useState(1.0)
  const [selectedVoice, setSelectedVoice] = useState(null)
  const [availableVoices, setAvailableVoices] = useState([])
  const [showControls, setShowControls] = useState(false)
  const utteranceRef = useRef(null)

  useEffect(() => {
    const postData = getPostBySlug(slug)
    setPost(postData)
    setLoading(false)

    // Load voices
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      const englishVoices = voices.filter(voice => 
        voice.lang.includes('en') && 
        (voice.name.includes('Natural') || 
         voice.name.includes('Premium') || 
         voice.name.includes('Enhanced') ||
         voice.name.includes('Samantha') ||
         voice.name.includes('Alex') ||
         voice.name.includes('Karen') ||
         voice.name.includes('Moira') ||
         voice.name.includes('Tessa') ||
         voice.name.includes('Daniel') ||
         voice.name.includes('Karen') ||
         voice.name.includes('Monica'))
      ).sort((a, b) => {
        // Prioritize higher quality voices
        const qualityOrder = ['Premium', 'Enhanced', 'Natural', 'Neural']
        const aQuality = qualityOrder.findIndex(q => a.name.includes(q))
        const bQuality = qualityOrder.findIndex(q => b.name.includes(q))
        if (aQuality !== bQuality) return aQuality - bQuality
        return a.name.localeCompare(b.name)
      })

      setAvailableVoices(englishVoices)
      
      // Auto-select best voice
      if (englishVoices.length > 0) {
        setSelectedVoice(englishVoices[0])
      }
    }

    // Load voices immediately and also when they're ready
    loadVoices()
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [slug])

  const enhanceText = (text) => {
    // Add natural pauses and emphasis
    return text
      .replace(/\.\s+/g, '. <break time="400ms"/> ') // Longer pause after sentences
      .replace(/\?\s+/g, '? <break time="600ms"/> ') // Longer pause after questions
      .replace(/\!\s+/g, '! <break time="500ms"/> ') // Pause after exclamations
      .replace(/;\s+/g, '; <break time="300ms"/> ') // Medium pause after semicolons
      .replace(/:\s+/g, ': <break time="200ms"/> ') // Short pause after colons
      .replace(/\n\n+/g, '<break time="800ms"/> ') // Longer pause between paragraphs
      .replace(/\n+/g, '<break time="400ms"/> ') // Pause between lines
      .replace(/\*\*(.*?)\*\*/g, '<emphasis level="strong">$1</emphasis>') // Bold text emphasis
      .replace(/\*(.*?)\*/g, '<emphasis level="moderate">$1</emphasis>') // Italic emphasis
      .replace(/"([^"]+)"/g, '<emphasis level="moderate">"$1"</emphasis>') // Quotes emphasis
  }

  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel()
      setIsReading(false)
    } else {
      const essayContent = document.querySelector('.post-content')
      if (!essayContent) return

      const rawText = essayContent.textContent
      const enhancedText = enhanceText(rawText)
      
      utteranceRef.current = new SpeechSynthesisUtterance(enhancedText)
      
      // Enhanced speech settings
      utteranceRef.current.rate = speechRate
      utteranceRef.current.pitch = speechPitch
      utteranceRef.current.volume = 1.0
      utteranceRef.current.lang = 'en-US'
      
      // Use selected voice if available
      if (selectedVoice) {
        utteranceRef.current.voice = selectedVoice
      }
      
      // Enhanced prosody settings
      utteranceRef.current.pitch = speechPitch
      utteranceRef.current.rate = Math.max(0.5, Math.min(2.0, speechRate))
      
      // Handle speech events
      utteranceRef.current.onstart = () => {
        setIsReading(true)
      }
      
      utteranceRef.current.onend = () => {
        setIsReading(false)
      }
      
      utteranceRef.current.onerror = (event) => {
        console.error('Speech error:', event)
        setIsReading(false)
      }
      
      utteranceRef.current.onboundary = (event) => {
        // Optional: Add visual highlighting of current word
        if (event.name === 'word') {
          // Could implement word highlighting here
        }
      }
      
      // Start speaking
      window.speechSynthesis.speak(utteranceRef.current)
    }
  }

  const stopReading = () => {
    window.speechSynthesis.cancel()
    setIsReading(false)
  }

  if (loading) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontFamily: 'Georgia, serif', color: '#737373' }}>Loading...</p>
        </div>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '36px', marginBottom: '16px' }}>
            Article Not Found
          </h1>
          <p style={{ fontFamily: 'Georgia, serif', color: '#737373', marginBottom: '24px' }}>
            The article you're looking for doesn't exist.
          </p>
          <Link 
            to="/blog" 
            style={{ 
              fontFamily: 'Georgia, serif',
              color: '#121212',
              textDecoration: 'underline',
              fontStyle: 'italic'
            }}
          >
            Back to Opinion
          </Link>
        </div>
      </Layout>
    )
  }

  // Remove the first H1 from content to avoid duplication
  const contentWithoutFirstH1 = post.content.replace(/^# .+\n?/, '')

  return (
    <>
      <Helmet>
        <title>{post.title} - Franco Bonafina</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content="AI, product development, team structure, technology leadership, artificial intelligence, machine learning, tech teams, software engineering, data science" />
        <meta name="author" content="Franco Bonafina" />
        <link rel="canonical" href={`https://franbonafina.github.io/blog/${slug}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Franco Bonafina" />
        <meta property="og:url" content={`https://franbonafina.github.io/blog/${slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://franbonafina.github.io${post.image}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://franbonafina.github.io/blog/${slug}`} />
        <meta property="twitter:title" content={post.title} />
        <meta property="twitter:description" content={post.excerpt} />
        <meta property="twitter:image" content={`https://franbonafina.github.io${post.image}`} />
        
        {/* Article Specific */}
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        <meta property="article:author" content="Franco Bonafina" />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content="AI" />
        <meta property="article:tag" content="Product Development" />
        <meta property="article:tag" content="Leadership" />
        <meta property="article:tag" content="Team Structure" />
        
        {/* Structured Data - JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": `https://franbonafina.github.io${post.image}`,
            "author": {
              "@type": "Person",
              "name": "Franco Bonafina",
              "url": "https://franbonafina.github.io"
            },
            "publisher": {
              "@type": "Person",
              "name": "Franco Bonafina"
            },
            "datePublished": new Date(post.date).toISOString(),
            "dateModified": new Date(post.date).toISOString(),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://franbonafina.github.io/blog/${slug}`
            },
            "articleSection": "Technology",
            "keywords": "AI, product development, team structure, technology leadership",
            "wordCount": post.content.split(' ').length,
            "inLanguage": "en-US"
          })}
        </script>
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/assets/posts/01_learning_curve.png" as="image" />
      </Helmet>
      
      <Layout>
        <article style={{ maxWidth: '680px', margin: '0 auto' }}>
          <header style={{ 
            textAlign: 'center', 
            padding: '80px 0 40px',
            borderBottom: '1px solid #121212',
            marginBottom: '40px'
          }}>
            <div style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '14px',
              color: '#737373',
              fontStyle: 'italic',
              marginBottom: '16px',
              letterSpacing: '0.3px'
            }}>
              Opinion
            </div>
            
            <h1 style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '42px',
              fontWeight: '700',
              color: '#121212',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              lineHeight: '1.1'
            }}>
              {post.title}
            </h1>
            
            <time style={{ 
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '14px',
              color: '#737373',
              fontStyle: 'italic',
              letterSpacing: '0.3px'
            }}>
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </time>
          </header>

          {post.image && (
            <div style={{ 
              marginBottom: '40px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <img 
                src={post.image}
                alt={post.title}
                loading="lazy"
                style={{ 
                  width: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
              <p style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '10px',
                color: '#999999',
                fontStyle: 'italic',
                textAlign: 'center',
                margin: '8px 0 0 0',
                lineHeight: '1.3'
              }}>
                A visualization of the three-phase AI development process, showing how a single scientist's discovery flows through a translator's blueprint to become an engineer's production system.
              </p>
            </div>
          )}
          
          <div className="post-content">
            <ReactMarkdown
              components={{
                h1: ({children}) => (
                  <h1 style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#121212',
                    marginBottom: '24px',
                    letterSpacing: '-0.5px',
                    lineHeight: '1.1'
                  }}>
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#121212',
                    marginTop: '40px',
                    marginBottom: '16px',
                    letterSpacing: '-0.3px',
                    lineHeight: '1.2'
                  }}>
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#121212',
                    marginTop: '32px',
                    marginBottom: '12px',
                    letterSpacing: '-0.2px',
                    lineHeight: '1.3'
                  }}>
                    {children}
                  </h3>
                ),
                p: ({children}) => (
                  <p style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: '#333333',
                    marginBottom: '24px',
                    fontWeight: '400'
                  }}>
                    {children}
                  </p>
                ),
                ul: ({children}) => (
                  <ul style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: '#333333',
                    marginBottom: '24px',
                    paddingLeft: '30px',
                    fontWeight: '400'
                  }}>
                    {children}
                  </ul>
                ),
                ol: ({children}) => (
                  <ol style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    fontSize: '18px',
                    lineHeight: '1.6',
                    color: '#333333',
                    marginBottom: '24px',
                    paddingLeft: '30px',
                    fontWeight: '400'
                  }}>
                    {children}
                  </ol>
                ),
                li: ({children}) => (
                  <li style={{
                    marginBottom: '8px'
                  }}>
                    {children}
                  </li>
                ),
                strong: ({children}) => (
                  <strong style={{
                    fontWeight: '700',
                    color: '#121212'
                  }}>
                    {children}
                  </strong>
                ),
                code: ({children}) => (
                  <code style={{
                    fontFamily: '"SF Mono", Monaco, monospace',
                    fontSize: '16px',
                    backgroundColor: '#f2f2f7',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    color: '#121212'
                  }}>
                    {children}
                  </code>
                ),
                blockquote: ({children}) => (
                  <blockquote style={{
                    borderLeft: '3px solid #121212',
                    paddingLeft: '20px',
                    margin: '32px 0',
                    fontStyle: 'italic',
                    color: '#737373',
                    fontSize: '20px',
                    lineHeight: '1.5'
                  }}>
                    {children}
                  </blockquote>
                )
              }}
            >
              {contentWithoutFirstH1}
            </ReactMarkdown>
          </div>

          <footer style={{ 
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '1px solid #d2d2d7',
            textAlign: 'center'
          }}>
            <Link 
              to="/blog"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '14px',
                color: '#121212',
                textDecoration: 'none',
                fontStyle: 'italic',
                borderBottom: '1px solid #121212',
                paddingBottom: '1px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.borderBottomColor = '#737373'
                e.target.style.color = '#737373'
              }}
              onMouseOut={(e) => {
                e.target.style.borderBottomColor = '#121212'
                e.target.style.color = '#121212'
              }}
            >
              ← Back to Opinion
            </Link>
          </footer>
        </article>
        
        {/* Enhanced Audio Reader Controls */}
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ffffff',
          border: '1px solid #e5e5e7',
          borderRadius: '12px',
          padding: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          minWidth: showControls ? '280px' : 'auto'
        }}>
          {/* Main Controls */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: showControls ? '12px' : '0' }}>
            <button
              onClick={toggleReading}
              style={{
                background: isReading ? '#ff4444' : '#121212',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 16px',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.05)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)'
              }}
            >
              {isReading ? '⏸️' : '🎧'} {isReading ? 'Pause' : 'Listen'}
            </button>
            
            {isReading && (
              <button
                onClick={stopReading}
                style={{
                  background: '#666666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 16px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)'
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)'
                }}
              >
                ⏹️ Stop
              </button>
            )}
            
            <button
              onClick={() => setShowControls(!showControls)}
              style={{
                background: '#f0f0f0',
                color: '#121212',
                border: '1px solid #e5e5e7',
                borderRadius: '8px',
                padding: '10px 12px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#e5e5e7'
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#f0f0f0'
              }}
            >
              ⚙️
            </button>
          </div>
          
          {/* Advanced Controls */}
          {showControls && (
            <div>
              {/* Voice Selection */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  color: '#737373',
                  fontStyle: 'italic',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Voice:
                </label>
                <select
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const voice = availableVoices.find(v => v.name === e.target.value)
                    setSelectedVoice(voice)
                  }}
                  style={{
                    width: '100%',
                    padding: '6px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '12px',
                    border: '1px solid #e5e5e7',
                    borderRadius: '4px',
                    background: 'white'
                  }}
                >
                  {availableVoices.map(voice => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Speed Control */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  color: '#737373',
                  fontStyle: 'italic',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Speed: {speechRate}x
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '4px',
                    cursor: 'pointer'
                  }}
                />
              </div>
              
              {/* Pitch Control */}
              <div>
                <label style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '11px',
                  color: '#737373',
                  fontStyle: 'italic',
                  display: 'block',
                  marginBottom: '4px'
                }}>
                  Pitch: {speechPitch}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={speechPitch}
                  onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '4px',
                    cursor: 'pointer'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Post
