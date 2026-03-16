import Link from "next/link"
import { getAllTags, getAllPosts } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"

export const metadata = {
  title: "标签列表 - 橙子博客",
  description: "浏览所有文章标签，发现感兴趣的内容",
}

export default function TagsPage() {
  const tags = getAllTags()
  const posts = getAllPosts()

  // 统计每个标签的文章数量
  const tagCounts = tags.reduce((acc, tag) => {
    acc[tag] = posts.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    ).length
    return acc
  }, {} as Record<string, number>)

  // 按文章数量排序
  const sortedTags = [...tags].sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <div className="animate-fade-in space-y-8">
      {/* 页面标题 */}
      <header className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-btn text-white mb-4">
          <Tag className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold gradient-text">标签列表</h1>
        <p className="text-muted-foreground">
          共 {tags.length} 个标签，{posts.length} 篇文章
        </p>
      </header>

      {/* 标签云 */}
      {sortedTags.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {sortedTags.map((tag, index) => (
            <Link 
              key={tag} 
              href={`/tags/${encodeURIComponent(tag)}`}
              className="animate-scale-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <Badge 
                variant="secondary" 
                className="tag-hover cursor-pointer text-base px-5 py-2.5"
              >
                {tag}
                <span className="ml-2 text-xs text-muted-foreground">
                  {tagCounts[tag]}
                </span>
              </Badge>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏷️</div>
          <p className="text-muted-foreground">暂无标签</p>
        </div>
      )}

      {/* 返回首页 */}
      <div className="text-center pt-8">
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