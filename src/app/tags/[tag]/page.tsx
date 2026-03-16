import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostsByTag, getAllTags } from "@/lib/posts"
import { PostCard } from "@/components/post-card"
import { Badge } from "@/components/ui/badge"

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
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          标签: <Badge variant="secondary">{decodedTag}</Badge>
        </h1>
        <p className="text-muted-foreground">
          共 {posts.length} 篇文章
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">暂无文章</p>
      )}

      <div className="mt-8">
        <Link 
          href="/tags" 
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← 查看所有标签
        </Link>
      </div>
    </div>
  )
}