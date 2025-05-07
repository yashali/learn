const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const matter = require('gray-matter');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Function to read and parse markdown files
async function getPosts() {
  const postsDirectory = path.join(__dirname, 'content', 'posts');
  const files = await fs.readdir(postsDirectory);
  
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.md'))
      .map(async file => {
        const filePath = path.join(postsDirectory, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data: frontmatter, content } = matter(fileContent);
        
        return {
          slug: path.basename(file, '.md'),
          title: frontmatter.title,
          date: frontmatter.date,
          excerpt: frontmatter.excerpt,
          tags: frontmatter.tags || [],
          author: frontmatter.author,
          readingTime: frontmatter.readingTime,
          coverImage: frontmatter.coverImage,
          content
        };
      })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// API endpoint to get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// API endpoint to get a single post by slug
app.get('/api/posts/:slug', async (req, res) => {
  try {
    const posts = await getPosts();
    const post = posts.find(p => p.slug === req.params.slug);
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 