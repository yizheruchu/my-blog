import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface Post {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  content: string
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory).filter(file => 
    file.endsWith(".mdx") || file.endsWith(".md")
  )
}

export function getPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.mdx?$/, "")
  const filePath = path.join(postsDirectory, `${realSlug}.mdx`)
  const altFilePath = path.join(postsDirectory, `${realSlug}.md`)
  
  const fullPath = fs.existsSync(filePath) ? filePath : altFilePath
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  
  return {
    slug: realSlug,
    title: data.title || "Untitled",
    date: data.date || new Date().toISOString(),
    description: data.description || "",
    tags: data.tags || [],
    content,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map(slug => getPostBySlug(slug.replace(/\.mdx?$/, "")))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
  
  return posts
}

export function getAllPostsMeta(): PostMeta[] {
  return getAllPosts().map(({ content, ...meta }) => meta)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagsSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}

export function getPaginatedPosts(page: number, perPage: number = 10): {
  posts: PostMeta[]
  totalPages: number
  currentPage: number
} {
  const allPosts = getAllPostsMeta()
  const totalPages = Math.ceil(allPosts.length / perPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  const offset = (currentPage - 1) * perPage
  
  return {
    posts: allPosts.slice(offset, offset + perPage),
    totalPages,
    currentPage,
  }
}