"use client"

import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc"
import React from "react"
import rehypeHighlight from "rehype-highlight"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import "katex/dist/katex.min.css"
import "highlight.js/styles/github-dark.css"

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
  code: ({ children, className }) => {
    const isInline = !className
    if (isInline) {
      return (
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {children}
        </code>
      )
    }
    return (
      <code className={className}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
      {children}
    </pre>
  ),
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