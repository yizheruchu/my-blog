import { Suspense } from "react"
import { getPaginatedPosts, getAllTags, getAllPostsMeta } from "@/lib/posts"
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
    <div className="space-y-8">
      {/* 标签云 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">热门标签</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary">
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
      <section>
        <h2 className="text-lg font-semibold mb-4">最新文章</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无文章</p>
        )}
      </section>

      {/* 分页 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/"
        className="mt-8"
      />
    </div>
  )
}