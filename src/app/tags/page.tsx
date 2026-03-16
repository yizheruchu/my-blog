import Link from "next/link"
import { getAllTags, getAllPosts } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "标签列表 - 橙子博客",
  description: "浏览所有文章标签",
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">所有标签</h1>
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge variant="outline" className="text-lg py-2 px-4 cursor-pointer hover:bg-secondary">
                {tag} ({tagCounts[tag]})
              </Badge>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">暂无标签</p>
      )}
    </div>
  )
}