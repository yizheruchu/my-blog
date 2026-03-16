import { notFound } from "next/navigation"
import Link from "next/link"
import { format } from "date-fns"
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

  const formattedDate = format(new Date(post.date), "yyyy-MM-dd")

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          <time dateTime={post.date}>{formattedDate}</time>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </header>
      
      <MDXContent source={post.content} />
      
      <footer className="mt-12 pt-8 border-t">
        <Link 
          href="/" 
          className="text-sm text-muted-foreground hover:text-primary"
        >
          ← 返回首页
        </Link>
      </footer>
    </article>
  )
}