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
  title: "我的博客",
  description: "一个使用 Next.js 15 构建的技术博客",
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
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
              <Link href="/" className="text-2xl font-bold">
                橙子博客
              </Link>
              <div className="flex items-center gap-4">
                <nav className="hidden sm:flex items-center gap-6">
                  <Link href="/" className="text-sm font-medium hover:text-primary">
                    首页
                  </Link>
                  <Link href="/tags" className="text-sm font-medium hover:text-primary">
                    标签
                  </Link>
                </nav>
                <SearchBar />
              </div>
            </div>
          </header>
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="border-t py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © 2026 橙子博客. 使用 Next.js 15 构建.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}