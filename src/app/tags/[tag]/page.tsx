import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostsByTag, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Tag } from "lucide-react"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({ tag }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params
  return {
    title: `${tag} - 标签 - 橙子博客`,
    description: `查看带有 ${tag} 标签的所有文章`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  const allTags = getAllTags()

  if (!allTags.some(t => t.toLowerCase() === decodedTag.toLowerCase())) {
    notFound()
  }

  return (
    <div className="animate-fade-in space-y-8">
      {/* 页面头部 */}
      <header className="text-center py-12 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-btn text-white mb-4">
          <Tag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <Badge variant="secondary" className="text-lg px-6 py-2">
            {decodedTag}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          共 {posts.length} 篇文章
        </p>
      </header>

      {/* 文章列表 */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 max-w-5xl mx-auto">
          {posts.map((post, index) => (
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
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <p className="text-muted-foreground">该标签下暂无文章</p>
        </div>
      )}

      {/* 底部导航 */}
      <div className="flex items-center justify-center gap-6 pt-8">
        <Link 
          href="/tags" 
          className="text-sm text-muted-foreground hover:text-primary transition-colors link-hover"
        >
          查看所有标签
        </Link>
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