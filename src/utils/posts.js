// Posts data - single source of truth for blog content
const posts = [
  {
    slug: 'ai-product-paradox',
    title: 'The AI Product Paradox; Why Three People Beat Three Hundred',
    date: '2024-03-17',
    excerpt: 'In the race to build AI products, companies are making a fundamental mistake. Bigger teams are not better teams. The secret to success lies not in numbers, but in the precise sequence of three specific profiles.',
    image: '/assets/posts/01_learning_curve.png',
    content: `# The AI Product Paradox; Why Three People Beat Three Hundred

Most AI projects don’t fail in the lab. They fail later, in production, when the system around the model matters more than the model itself. Across the tech industry, companies spend millions on AI initiatives, hiring dozens of engineers and data scientists, yet many projects never reach production. Meanwhile, a small handful consistently deliver working AI systems with remarkably small teams.

I have spent years observing this pattern from the inside. Successful AI systems follow a structure that is less about scale and more about sequence. **Not everyone is solving the same problem at the same time, and that often determines whether a system survives beyond experimentation.**

Every AI system begins with a single scientist in a space that feels more like a laboratory than a product environment. The goal is not scalability or integration, but simply whether the AI can solve the problem. Data is incomplete, assumptions are simplified, experiments are discarded, yet something essential is discovered.

Next comes a translator, someone who moves between models, engineering constraints, and business expectations. This role doesn’t refine the model, but defines the system around it, asking how it integrates, behaves in the real world, and delivers actual impact.

Only then do engineers enter, building something reliable, scalable, and monitorable. They are no longer solving the AI problem, but the engineering problem. The difference between teams becomes clear: some arrive with clarity, others still search for the problem, compensating with more people and adding complexity.

The quieter efficiency lies in sequence: one person validating the problem, another defining the system, a small group building for production. Fewer people, greater focus, and clarity at each step. The companies that consistently deliver AI systems understand where complexity belongs and where it does not.

The pattern is simple but easy to overlook: three roles, three moments, a sequence that turns artificial intelligence into something that actually works. Most AI projects fail in production. A few do not. The difference is not scale, but structure.
`
  }
]

export const getAllPosts = () => {
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPostBySlug = (slug) => {
  return posts.find(post => post.slug === slug)
}

export const getLatestPosts = (count = 3) => {
  return getAllPosts().slice(0, count)
}
