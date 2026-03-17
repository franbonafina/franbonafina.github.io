# Franco Bonafina - Personal Website

A minimal, fast, and SEO-friendly personal website built with React and Vite.

## Features

- **React + Vite**: Modern development stack with fast builds
- **React Router**: Client-side routing for smooth navigation
- **Markdown Support**: Blog posts written in Markdown
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Responsive Design**: Works on all devices
- **Minimal Design**: Clean black and white aesthetic
- **GitHub Pages Ready**: Configured for easy deployment

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/franbonafina/franbonafina.github.io.git
   cd franbonafina.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

### Building

Build for production:
```bash
npm run build
```

### Deployment

Deploy to GitHub Pages:
```bash
npm run deploy
```

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
│   ├── Home.jsx   # Homepage with profile
│   ├── Blog.jsx   # Blog listing page
│   ├── Post.jsx   # Individual blog post
│   └── NotFound.jsx # 404 page
├── main.jsx       # App entry point
└── index.css      # Global styles
```

## Adding Blog Posts

Blog posts are currently stored as sample data in `src/pages/Blog.jsx` and `src/pages/Post.jsx`. 

To add a new blog post:

1. Add the post metadata to the `samplePosts` array in `Blog.jsx`
2. Add the full markdown content to the `posts` object in `Post.jsx`

For a more advanced setup, you could:
- Create a `content/blog/` directory for markdown files
- Use a build process to parse markdown files
- Add frontmatter for metadata

## SEO Features

- Dynamic title tags for each page
- Meta descriptions
- Open Graph tags for social sharing
- Structured data (Person schema) for homepage
- Semantic HTML5 markup

## Customization

### Styling
Edit `src/index.css` to customize the design. The current design uses:
- System fonts for optimal performance
- Minimal black and white color scheme
- Responsive breakpoints for mobile devices

### Content
Update personal information in `src/pages/Home.jsx`:
- Name and headline
- Bio text
- Social media links
- Areas of interest

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering
- **React Helmet Async** - SEO meta tags
- **GH Pages** - Deployment to GitHub Pages

## License

MIT License - feel free to use this as a template for your own site.
