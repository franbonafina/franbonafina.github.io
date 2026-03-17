// Dynamic posts loader - reads markdown files from posts directory
import matter from 'gray-matter'

// List of available markdown files
const postFiles = [
  'ai-learning-curve.md'
]

// Function to get today's date in the required format
const getTodayDate = () => {
  return new Date().toISOString().split('T')[0]
}

// Function to dynamically load posts from markdown files
const loadPosts = () => {
  return postFiles.map(filename => {
    // For now, we'll use the hardcoded content since we can't dynamically import files in the browser
    // In a real app, this would be handled by a build process or API
    const posts = {
      'ai-learning-curve.md': {
        slug: 'ai-learning-curve',
        title: 'Building AI Teams; The Right Profiles for Product Development',
        date: getTodayDate(),
        excerpt: 'Successful AI product development requires specific team profiles and clear processes. Learn how to structure teams with the right roles, define expected outputs, and establish effective development workflows.',
        image: '/assets/posts/01_learning_curve.png',
        content: `# Building AI Teams; The Right Profiles for Product Development

In my one decade leading technology organizations through three major technological shifts, I have learned that AI product development fails not because of poor technology; it fails because of wrong team structures. Companies invest heavily in infrastructure and tools, but most struggle to deliver meaningful AI products. The issue is not individual skills; it is how we organize teams and define their roles.

## The Profile Mismatch

Most technology organizations approach AI product development with traditional software team structures. They assemble groups of engineers, assign a project manager, and expect AI products to emerge. This approach consistently fails because AI product development requires fundamentally different team profiles.

Traditional software teams focus on building deterministic systems with clear specifications. AI product teams need to build probabilistic systems with evolving requirements. These are not just different approaches; they require different team compositions and working methods.

## Essential Team Profiles

After leading AI product initiatives at two major technology companies, I have identified four critical profiles that every successful AI product team needs;

### The Data Scientist Profile
This team member brings statistical rigor and experimental methodology. They understand hypothesis testing, model validation, and causal inference. Their role is to ensure that AI decisions are based on sound statistical principles rather than engineering intuition.

### The Machine Learning Engineer Profile
This profile bridges theoretical models and production systems. They understand both the mathematical foundations of algorithms and the practical constraints of deployment. Their focus is on model performance, scalability, and operational reliability.

### The Product Strategy Profile
This team member connects AI capabilities to business problems. They understand which problems are worth solving with AI and how to measure success. Their role is to define product requirements that balance technical feasibility with business impact.

### The Domain Expert Profile
This profile brings contextual knowledge that makes AI useful in real applications. They understand the nuances of the problem domain and can validate whether AI solutions make practical sense. Without this profile, AI products often solve the wrong problems.

## Team Structure and Goals

The most effective AI product teams organize around specific outcomes rather than technical components. Instead of having separate frontend, backend, and AI teams, successful organizations create cross-functional groups focused on product objectives.

Each team should have clear deliverables;
- **Problem definition documents** that specify what user problem the AI will solve
- **Success metrics** that define measurable business outcomes
- **Model performance targets** that establish acceptable accuracy and reliability thresholds
- **Deployment roadmaps** that outline how models will be integrated into production systems

## Product Development Process

AI product development requires an iterative process that differs from traditional software development;

### Discovery Phase
Teams spend time understanding the problem space and identifying where AI can create unique value. This phase involves extensive data analysis and feasibility assessment before any model development begins.

### Experimentation Phase
Teams build proof-of-concept models to test core assumptions. The goal is not production readiness but validation that the AI approach can solve the identified problem effectively.

### Development Phase
Teams refine models and build production systems. This phase focuses on model performance, scalability, and integration with existing infrastructure.

### Deployment Phase
Teams implement monitoring and feedback systems. AI products require ongoing performance tracking and model updates based on real-world usage data.

## Expected Outputs and Success Metrics

Successful AI product teams deliver specific outputs;

1. **Validated problem statements** with clear business impact
2. **Production-ready models** with documented performance characteristics
3. **Monitoring systems** that track model performance in real time
4. **Improvement processes** that enable continuous model updates

Success metrics should focus on business outcomes rather than technical metrics;
- User adoption and engagement
- Business process efficiency gains
- Revenue impact or cost reduction
- Customer satisfaction improvements

## Integration with Existing Development Processes

AI product teams should not operate in isolation. They need to integrate with established software development practices while accommodating AI-specific requirements;

- **Version control** for both code and model artifacts
- **Testing frameworks** that include model validation
- **Deployment pipelines** that support model updates
- **Monitoring systems** that track both system and model performance

## Leadership and Team Management

Leading AI product teams requires different management approaches than traditional software teams. Managers need to;

- Embrace uncertainty as a natural part of AI development
- Create environments where experimentation is encouraged
- Establish clear decision-making frameworks for model trade-offs
- Build communication channels between technical and business stakeholders

## The Path Forward

Organizations that succeed in AI product development understand that it requires new team structures, processes, and success metrics. The companies that will lead the AI revolution are not those with the most engineers or the biggest computing budgets; they are the ones that build teams with the right profiles and establish effective product development processes.

The question is not whether your organization has the technical capability for AI; it is whether you have structured your teams and processes to deliver AI products that create real business value.`
      }
    }
    
    return posts[filename] || null
  }).filter(post => post !== null)
}

export const getAllPosts = () => {
  const posts = loadPosts()
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export const getPostBySlug = (slug) => {
  const posts = loadPosts()
  return posts.find(post => post.slug === slug)
}

export const getLatestPosts = (count = 3) => {
  return getAllPosts().slice(0, count)
}

// Helper function to add new posts - just add to postFiles array and import the content
export const addPost = (filename, content) => {
  // This would be used in development to dynamically add posts
  // In production, you'd add the filename to postFiles and the content to the posts object
  console.log(`Post ${filename} added`)
}
