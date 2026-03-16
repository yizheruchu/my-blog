import { Suspense } from "react"
import SearchContent from "./search-content"

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}