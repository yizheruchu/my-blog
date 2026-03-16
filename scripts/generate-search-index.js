#!/usr/bin/env node

/**
 * 构建前脚本：生成搜索索引
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(process.cwd(), 'content/posts')
const OUTPUT_FILE = path.join(process.cwd(), 'public/search-index.json')

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))

  const posts = files.map(file => {
    const filePath = path.join(POSTS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(content)
    const slug = file.replace(/\.mdx?$/, '')

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      description: data.description || '',
      tags: data.tags || [],
    }
  })

  // 按日期排序
  return posts.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

function main() {
  console.log('🔍 Generating search index...')

  const posts = getAllPosts()
  
  const index = {
    posts,
    version: new Date().toISOString(),
    count: posts.length,
  }

  // 确保 public 目录存在
  const publicDir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2))
  
  console.log(`✅ Search index generated with ${posts.length} posts`)
}

main()