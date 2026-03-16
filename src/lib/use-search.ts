"use client"

import { useState, useEffect, useCallback } from "react"
import Fuse from "fuse.js"

export interface SearchPost {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

let searchIndexCache: SearchPost[] | null = null
let fuseInstance: Fuse<SearchPost> | null = null

export function useSearch() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [posts, setPosts] = useState<SearchPost[]>([])

  // 加载搜索索引
  useEffect(() => {
    async function loadIndex() {
      if (searchIndexCache) {
        setPosts(searchIndexCache)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/search-index.json")
        if (!response.ok) {
          throw new Error("Failed to load search index")
        }
        const data = await response.json()
        searchIndexCache = data.posts
        setPosts(data.posts || [])
      } catch (e) {
        console.error("Failed to load search index:", e)
        setError("无法加载搜索索引")
      } finally {
        setIsLoading(false)
      }
    }

    loadIndex()
  }, [])

  // 初始化 Fuse.js
  const getFuse = useCallback(() => {
    if (fuseInstance) {
      return fuseInstance
    }

    fuseInstance = new Fuse(posts, {
      keys: [
        { name: "title", weight: 0.4 },
        { name: "description", weight: 0.25 },
        { name: "tags", weight: 0.25 },
        { name: "slug", weight: 0.1 },
      ],
      threshold: 0.4,
      includeScore: true,
      findAllMatches: true,
      ignoreLocation: true,
      minMatchCharLength: 1,
    })

    return fuseInstance
  }, [posts])

  // 搜索函数
  const search = useCallback((query: string): SearchPost[] => {
    if (!query.trim()) {
      return posts
    }

    const fuse = getFuse()
    const results = fuse.search(query, {
      limit: 20,
    })

    return results.map(result => result.item)
  }, [posts, getFuse])

  // 按标签搜索
  const searchByTag = useCallback((tag: string): SearchPost[] => {
    const lowerTag = tag.toLowerCase()
    return posts.filter(post =>
      post.tags.some(t => t.toLowerCase().includes(lowerTag))
    )
  }, [posts])

  // 获取所有标签
  const getAllTags = useCallback((): string[] => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  return {
    posts,
    isLoading,
    error,
    search,
    searchByTag,
    getAllTags,
  }
}