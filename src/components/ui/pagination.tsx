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
    <nav className={cn("flex items-center justify-center gap-1", className)}>
      <Link
        href={getPageUrl(currentPage - 1)}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          currentPage === 1
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        上一页
      </Link>

      {startPage > 1 && (
        <>
          <Link
            href={getPageUrl(1)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            1
          </Link>
          {startPage > 2 && (
            <span className="flex h-9 w-9 items-center justify-center text-sm">
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
            "flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors",
            page === currentPage
              ? "bg-primary text-primary-foreground shadow"
              : "hover:bg-accent hover:text-accent-foreground"
          )}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="flex h-9 w-9 items-center justify-center text-sm">
              ...
            </span>
          )}
          <Link
            href={getPageUrl(totalPages)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {totalPages}
          </Link>
        </>
      )}

      <Link
        href={getPageUrl(currentPage + 1)}
        className={cn(
          "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          currentPage === totalPages
            ? "pointer-events-none opacity-50"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-disabled={currentPage === totalPages}
      >
        下一页
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  )
}