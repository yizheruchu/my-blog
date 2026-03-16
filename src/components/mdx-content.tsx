"use client"

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc"
import React from "react"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"

// 代码块包装组件（带复制按钮和语言标签）
function CodeBlock({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const match = /language-(\w+)/.exec(className || "")
  const language = match ? match[1] : ""
  
  // 判断是否是代码块（有语言类名或 pre 的子元素）
  const isCodeBlock = className?.includes("language-") || 
    (typeof children === "object" && React.isValidElement(children) && 
     (children.props as any)?.className?.includes("language-"))

  if (!isCodeBlock) {
    // 行内代码
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" {...props}>
        {children}
      </code>
    )
  }

  // 获取实际的语言名
  const actualLanguage = language || 
    (React.isValidElement(children) && (children.props as any)?.className?.match(/language-(\w+)/)?.[1]) ||
    "code"

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

  const displayName = languageNames[actualLanguage.toLowerCase()] || actualLanguage.toUpperCase()

  return (
    <div className="relative group my-4">
      {/* 语言标签和复制按钮 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 rounded-t-lg border-b border-gray-700">
        <span className="text-xs text-gray-400 font-medium">{displayName}</span>
        <CopyButton />
      </div>
      
      {/* 代码内容 */}
      <div className="overflow-x-auto rounded-b-lg">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    </div>
  )
}

// 复制按钮组件
function CopyButton() {
  return (
    <button
      className="copy-btn text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-gray-700"
      onClick={async (e) => {
        const codeBlock = e.currentTarget.closest(".relative")?.querySelector("code")
        const code = codeBlock?.textContent || ""
        
        try {
          await navigator.clipboard.writeText(code)
          const btn = e.currentTarget
          const originalText = btn.innerHTML
          btn.innerHTML = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>已复制</span>`
          btn.classList.add("text-green-400")
          
          setTimeout(() => {
            btn.innerHTML = originalText
            btn.classList.remove("text-green-400")
          }, 2000)
        } catch (err) {
          console.error("Failed to copy:", err)
        }
      }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
      <span>复制</span>
    </button>
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
  code: CodeBlock,
  pre: ({ children }) => {
    // 如果子元素已经是带语言标签的代码块，直接返回
    if (React.isValidElement(children) && 
        (children.props as any)?.className?.includes("language-")) {
      return <>{children}</>
    }
    return (
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-black p-4">
        {children}
      </pre>
    )
  },
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