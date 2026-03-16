import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy-MM-dd")

  return (
    <Link href={`/posts/${post.slug}`} className="block">
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader>
          <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
          <CardDescription>{formattedDate}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">{post.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}