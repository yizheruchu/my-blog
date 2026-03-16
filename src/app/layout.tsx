import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import Link from "next/link"
import "./globals.css"
import { SearchBar } from "@/components/search-bar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "橙子博客 | 技术分享与思考",
  description: "一个使用 Next.js 15 构建的技术博客，分享前端开发、编程技巧与技术思考",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="min-h-screen flex flex-col relative overflow-hidden">
          {/* 装饰性渐变球 */}
          <div className="gradient-orb w-96 h-96 bg-blue-400 dark:bg-blue-600 top-0 -left-48 fixed" />
          <div className="gradient-orb w-80 h-80 bg-purple-400 dark:bg-purple-600 top-1/3 -right-40 fixed" />
          <div className="gradient-orb w-64 h-64 bg-pink-400 dark:bg-pink-600 bottom-0 left-1/4 fixed" />
          
          {/* 头部 */}
          <header className="sticky top-0 z-50 glass border-b border-border/50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <Link href="/" className="group flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center text-white font-bold text-lg">
                    🍊
                  </div>
                  <span className="text-xl font-bold gradient-text hidden sm:block">
                    橙子博客
                  </span>
                </Link>
                
                <div className="flex items-center gap-4">
                  <nav className="hidden sm:flex items-center gap-1">
                    <Link 
                      href="/" 
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    >
                      首页
                    </Link>
                    <Link 
                      href="/tags" 
                      className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
                    >
                      标签
                    </Link>
                  </nav>
                  <div className="search-focus rounded-lg border border-border bg-background">
                    <SearchBar />
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* 主内容 */}
          <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
            {children}
          </main>
          
          {/* 页脚 */}
          <footer className="border-t border-border/50 py-8 glass relative z-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="text-2xl">🍊</span>
                  <span className="text-sm">用代码改变世界</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <a href="https://github.com/yizheruchu/my-blog" target="_blank" rel="noopener noreferrer" className="link-hover hover:text-foreground transition-colors">
                    GitHub
                  </a>
                  <span>© 2026 橙子博客</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}