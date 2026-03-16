"use client"

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc"
import React from "react"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"

const languageNames: Record<string, string> = {
  typescript: "TypeScript",
  javascript: "JavaScript",
  tsx: "TSX",
  jsx: "JSX",
  python: "Python",
  rust: "Rust",
  go: "Go",
  java: "Java",
  cpp: "C++",
  c: "C",
  css: "CSS",
  scss: "SCSS",
  html: "HTML",
  json: "JSON",
  yaml: "YAML",
  bash: "Bash",
  shell: "Shell",
  sql: "SQL",
  markdown: "Markdown",
  mdx: "MDX",
}

// 复制按钮组件
function CopyButton({ code }: { code: string }) {
  return (
    <button
      className="copy-btn absolute right-2 top-2 text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded bg-gray-700/50 hover:bg-gray-600/50"
      onClick={async (e) => {
        try {
          await navigator.clipboard.writeText(code)
          const btn = e.currentTarget
          const originalHTML = btn.innerHTML
          btn.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>已复制`
          btn.classList.add("text-green-400")
          
          setTimeout(() => {
            btn.innerHTML = originalHTML
            btn.classList.remove("text-green-400")
          }, 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
        }
      }}
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      复制
    </button>
  )
}

// Pre 组件 - 包装代码块
function Pre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  // 检查子元素是否是代码块
  if (!React.isValidElement(children)) {
    return <pre {...props}>{children}</pre>
  }

  const childProps = children.props as any
  const className = childProps?.className || ""
  const match = /language-(\w+)/.exec(className)
  const language = match ? match[1] : ""
  const code = childProps?.children || ""
  
  // 如果没有语言标记，按普通 pre 处理
  if (!language) {
    return (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm" {...props}>
        {children}
      </pre>
    )
  }

  const displayName = languageNames[language.toLowerCase()] || language.toUpperCase()

  return (
    <div className="relative my-6 rounded-lg overflow-hidden border border-gray-700">
      {/* 头部：语言标签和复制按钮 */}
      <div className="flex items-center justify-between bg-gray-800/80 px-4 py-2 border-b border-gray-700">
        <span className="text-xs text-gray-400 font-medium">{displayName}</span>
        <CopyButton code={typeof code === "string" ? code : ""} />
      </div>
      
      {/* 代码内容 */}
      <pre className="!mt-0 !mb-0 overflow-x-auto bg-gray-900 p-4 text-sm" {...props}>
        {children}
      </pre>
    </div>
  )
}

// 行内代码组件
function Code({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  // 如果有语言类名，说明是代码块中的代码，由 Pre 处理
  if (className?.includes("language-")) {
    return <code className={className} {...props}>{children}</code>
  }
  
  // 行内代码
  return (
    <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  )
}

const components: MDXRemoteProps["components"] = {
  h1: ({ children }) => (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-3">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 pl-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  pre: Pre,
  code: Code,
  table: ({ children }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b transition-colors hover:bg-muted/50">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="p-4 align-middle">
      {children}
    </td>
  ),
  a: ({ children, href }) => (
    <a 
      href={href as string} 
      className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-8 border-border" />,
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm,
              remarkMath,
            ],
            rehypePlugins: [
              rehypeHighlight,
              rehypeKatex,
            ],
          },
        }}
      />
    </div>
  )
}