import { notFound } from "next/navigation"
import { searchPosts } from "@/lib/search"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-8">搜索文章</h1>
        <SearchBar />
        <p className="mt-8 text-muted-foreground">
          请输入搜索关键词来查找文章
        </p>
      </div>
    )
  }

  const results = searchPosts(query)

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">搜索结果</h1>
        <p className="text-muted-foreground mb-4">
          关键词: "{query}", 找到 {results.length} 篇文章
        </p>
        <SearchBar initialQuery={query} />
      </header>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {results.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">没有找到匹配的文章</p>
          <p className="text-sm text-muted-foreground">
            尝试使用不同的关键词
          </p>
        </div>
      )}
    </div>
  )
}