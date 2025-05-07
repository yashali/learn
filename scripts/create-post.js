const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function createPost() {
  const title = await question('Post title: ')
  const excerpt = await question('Post excerpt: ')
  const tags = (await question('Tags (comma-separated): ')).split(',').map(t => t.trim())
  const author = await question('Author name: ')

  const date = new Date().toISOString().split('T')[0]
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${date}"
tags: ${JSON.stringify(tags)}
author: "${author}"
---

# ${title}

Write your blog post content here...
`

  const filePath = path.join(__dirname, '..', 'content', 'posts', `${slug}.md`)
  fs.writeFileSync(filePath, frontmatter)
  console.log(`Created new post at: ${filePath}`)
  rl.close()
}

createPost().catch(console.error) 