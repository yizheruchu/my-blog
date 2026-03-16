import { searchPosts } from "@/lib/search"
import { PostCard } from "@/components/post-card"
import { SearchBar } from "@/components/search-bar"
import { Search, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface SearchPageProps {
  searchParams: { q?: string }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="animate-fade-in space-y-12">
        {/* 页面标题 */}
        <header className="text-center py-12 space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl gradient-btn text-white mb-4">
            <Search className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">搜索文章</h1>
          <p className="text-muted-foreground">
            输入关键词搜索你感兴趣的内容
          </p>
        </header>

        {/* 搜索框 */}
        <div className="max-w-lg mx-auto">
          <div className="search-focus rounded-xl border border-border bg-card/50 p-2">
            <SearchBar />
          </div>
        </div>

        {/* 返回首页 */}
        <div className="text-center">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors link-hover"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    )
  }

  const results = searchPosts(query)

  return (
    <div className="animate-fade-in space-y-8">
      {/* 搜索结果头部 */}
      <header className="text-center py-8 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-btn text-white mb-4">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold">搜索结果</h1>
        <p className="text-muted-foreground">
          关键词 "<span className="text-primary font-medium">{query}</span>" 
          找到 <span className="font-medium">{results.length}</span> 篇文章
        </p>
      </header>

      {/* 搜索框 */}
      <div className="max-w-lg mx-auto">
        <div className="search-focus rounded-xl border border-border bg-card/50 p-2">
          <SearchBar initialQuery={query} />
        </div>
      </div>

      {/* 搜索结果 */}
      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
          {results.map((post, index) => (
            <div 
              key={post.slug} 
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 space-y-4">
          <div className="text-6xl">🔍</div>
          <p className="text-muted-foreground">没有找到匹配的文章</p>
          <p className="text-sm text-muted-foreground">
            尝试使用不同的关键词，或浏览
            <Link href="/tags" className="text-primary hover:underline ml-1">
              所有标签
            </Link>
          </p>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex items-center justify-center gap-6 pt-8">
        <Link 
          href="/" 
          className="gradient-btn text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </div>
  )
}