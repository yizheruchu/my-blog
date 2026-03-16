import { getPaginatedPosts, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface HomePageProps {
  searchParams: { page?: string }
}

export default function HomePage({ searchParams }: HomePageProps) {
  const page = parseInt(searchParams.page || "1", 10)
  const { posts, totalPages, currentPage } = getPaginatedPosts(page, 10)
  const tags = getAllTags()

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero 区域 */}
      <section className="text-center py-12 space-y-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight">
          <span className="gradient-text">技术分享</span>
          <span className="block mt-2">与思考</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          记录前端开发、编程技巧与技术成长，分享我在技术道路上的探索与收获
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/tags" 
            className="gradient-btn text-white px-6 py-3 rounded-xl font-medium"
          >
            浏览标签
          </Link>
          <Link 
            href="/search" 
            className="px-6 py-3 rounded-xl font-medium border border-border hover:border-primary hover:text-primary transition-all"
          >
            搜索文章
          </Link>
        </div>
      </section>

      {/* 标签云 */}
      <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full gradient-btn" />
            热门标签
          </h2>
          <Link 
            href="/tags" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors link-hover"
          >
            查看全部 →
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 8).map((tag, index) => (
            <Link 
              key={tag} 
              href={`/tags/${encodeURIComponent(tag)}`}
              style={{ animationDelay: `${index * 0.05}s` }}
              className="animate-scale-in"
            >
              <Badge 
                variant="secondary" 
                className="tag-hover cursor-pointer px-4 py-1.5 text-sm"
              >
                {tag}
              </Badge>
            </Link>
          ))}
          {tags.length === 0 && (
            <p className="text-muted-foreground text-sm">暂无标签</p>
          )}
        </div>
      </section>

      {/* 文章列表 */}
      <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full gradient-btn" />
            最新文章
          </h2>
          <span className="text-sm text-muted-foreground">
            第 {currentPage} / {totalPages} 页
          </span>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {posts.map((post, index) => (
              <div 
                key={post.slug} 
                className="animate-scale-in"
                style={{ animationDelay: `${0.3 + index * 0.05}s` }}
              >
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-muted-foreground">还没有文章，即将更新...</p>
          </div>
        )}
      </section>

      {/* 分页 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/"
          className="pt-8"
        />
      )}
    </div>
  )
}