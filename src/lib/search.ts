import Fuse from "fuse.js"
import { PostMeta, getAllPostsMeta } from "./posts"

let searchIndex: Fuse<PostMeta> | null = null

export function buildSearchIndex(): Fuse<PostMeta> {
  if (searchIndex) {
    return searchIndex
  }
  
  const posts = getAllPostsMeta()
  
  searchIndex = new Fuse(posts, {
    keys: [
      { name: "title", weight: 0.4 },
      { name: "description", weight: 0.3 },
      { name: "tags", weight: 0.2 },
      { name: "slug", weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
  })
  
  return searchIndex
}

export function searchPosts(query: string): PostMeta[] {
  if (!query.trim()) {
    return getAllPostsMeta()
  }
  
  const index = buildSearchIndex()
  const results = index.search(query)
  
  return results.map(result => result.item)
}