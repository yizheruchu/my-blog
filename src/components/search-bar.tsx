"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  initialQuery?: string
}

export function SearchBar({ initialQuery = "" }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }, [query, router])

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-sm gap-2">
      <Input
        type="search"
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="secondary" size="icon">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  )
}