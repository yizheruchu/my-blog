import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
  className?: string
}

export function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?"
    return `${baseUrl}${separator}page=${page}`
  }

  const pages = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <nav className={cn("flex items-center justify-center gap-2", className)}>
      {/* 上一页 */}
      <Link
        href={getPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-secondary hover:text-foreground text-muted-foreground"
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        上一页
      </Link>

      {/* 页码 */}
      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <Link
              href={getPageUrl(1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              1
            </Link>
            {startPage > 2 && (
              <span className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground">
                ...
              </span>
            )}
          </>
        )}

        {pages.map((page) => (
          <Link
            key={page}
            href={getPageUrl(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all",
              page === currentPage
                ? "gradient-btn text-white shadow-lg shadow-primary/25"
                : "hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {page}
          </Link>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground">
                ...
              </span>
            )}
            <Link
              href={getPageUrl(totalPages)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-all hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              {totalPages}
            </Link>
          </>
        )}
      </div>

      {/* 下一页 */}
      <Link
        href={getPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-secondary hover:text-foreground text-muted-foreground"
        )}
        aria-disabled={currentPage === totalPages}
      >
        下一页
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  )
}