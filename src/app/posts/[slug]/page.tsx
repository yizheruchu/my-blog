import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react"
import { getPostBySlug, getPostSlugs } from "@/lib/posts"
import { MDXContent } from "@/components/mdx-content"
import { Badge } from "@/components/ui/badge"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "文章未找到",
    }
  }
  
  return {
    title: `${post.title} - 橙子博客`,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = format(new Date(post.date), "yyyy年MM月dd日")
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 500)

  return (
    <article className="max-w-4xl mx-auto animate-fade-in">
      {/* 返回按钮 */}
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        返回首页
      </Link>

      {/* 文章头部 */}
      <header className="mb-12 animate-slide-up">
        {/* 标签 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge 
                variant="secondary" 
                className="tag-hover cursor-pointer"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        {/* 标题 */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 gradient-text">
          {post.title}
        </h1>

        {/* 元信息 */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>阅读约 {readingTime} 分钟</span>
          </div>
        </div>
      </header>

      {/* 文章内容 */}
      <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {/* 顶部渐变装饰 */}
        <div className="h-px gradient-btn mb-12" />
        
        <MDXContent source={post.content} />
        
        {/* 底部渐变装饰 */}
        <div className="h-px gradient-btn mt-12" />
      </div>

      {/* 文章底部 */}
      <footer className="mt-12 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            感谢阅读，欢迎分享！
          </div>
          <Link 
            href="/" 
            className="gradient-btn text-white px-6 py-2.5 rounded-lg font-medium inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </div>
      </footer>
    </article>
  )
}