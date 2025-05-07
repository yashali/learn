# My Blog

A modern blog built with React, TypeScript, and Markdown.

## Features

- Write blog posts in Markdown
- Support for rich content (images, videos, GIFs)
- Syntax highlighting for code blocks
- Tags and search functionality
- Responsive design
- GitHub Pages deployment

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

## Writing Blog Posts

### Creating a New Post

1. Run the create post script:
```bash
node scripts/create-post.js
```

2. Follow the prompts to enter:
   - Post title
   - Excerpt
   - Tags
   - Author name

3. The script will create a new markdown file in `content/posts/` with the proper frontmatter.

### Blog Post Structure

Each blog post is a Markdown file with frontmatter:

```markdown
---
title: "Your Post Title"
excerpt: "A brief description of your post"
date: "2024-03-20"
tags: ["tag1", "tag2"]
author: "Your Name"
coverImage: "/images/optional-cover-image.jpg"
---

# Your Post Title

Your content here...
```

### Adding Rich Content

1. **Images**
   ```markdown
   ![Alt Text](/images/your-image.jpg)
   ```

2. **Videos**
   ```markdown
   [![Video Title](https://img.youtube.com/vi/VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
   ```

3. **Code Blocks**
   ````markdown
   ```javascript
   const hello = "world";
   ```
   ````

4. **Links**
   ```markdown
   [Link Text](https://example.com)
   ```

### Managing Assets

1. Place images in the `public/images/` directory
2. Reference them in your markdown using absolute paths: `/images/your-image.jpg`

## Deployment

The blog is automatically deployed to GitHub Pages when you push to the main branch.

1. Push your changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. The GitHub Action will build and deploy your site
3. Your blog will be available at: `https://your-username.github.io/blog/`

## Development

### Project Structure

```
blog/
├── content/
│   └── posts/           # Blog post markdown files
├── public/
│   └── images/          # Image assets
├── src/
│   ├── components/      # React components
│   ├── types/          # TypeScript types
│   └── utils/          # Utility functions
└── scripts/            # Helper scripts
```

### Adding Features

1. **Custom Components**: Add new components in `src/components/`
2. **Styles**: Modify theme in `src/theme.ts`
3. **Types**: Update TypeScript types in `src/types/`

## License

MIT
