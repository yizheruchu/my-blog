import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Tag } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { PostMeta } from "@/lib/posts"

interface PostCardProps {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), "yyyy年MM月dd日")

  return (
    <Link href={`/posts/${post.slug}`} className="block group">
      <Card className="h-full card-hover border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* 顶部渐变条 */}
        <div className="h-1 gradient-btn" />
        
        <div className="p-6">
          {/* 标题 */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          {/* 描述 */}
          <p className="text-muted-foreground line-clamp-2 mb-4 text-sm leading-relaxed">
            {post.description}
          </p>
          
          {/* 元信息 */}
          <div className="flex items-center justify-between">
            {/* 日期 */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            
            {/* 标签数量 */}
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Tag className="w-3.5 h-3.5" />
                <span>{post.tags.length}</span>
              </div>
            )}
          </div>
          
          {/* 标签 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/50">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge 
                  variant="outline" 
                  className="text-xs px-2 py-0.5"
                >
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}