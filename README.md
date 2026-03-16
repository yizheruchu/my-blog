# 橙子博客

一个使用 Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui 构建的技术博客系统。

## 功能特性

- ✅ **文章列表页** - 分页展示，每页 10 篇
- ✅ **文章详情页** - 支持 Markdown/MDX 渲染
- ✅ **标签分类系统** - 标签云 + 标签详情页
- ✅ **搜索功能** - 前端模糊搜索
- ✅ **响应式设计** - 支持移动端/平板/桌面
- ✅ **代码高亮** - 使用 highlight.js
- ✅ **数学公式** - 使用 KaTeX

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **组件库**: shadcn/ui
- **Markdown**: next-mdx-remote + rehype + remark
- **搜索**: Fuse.js
- **日期**: date-fns

## 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd my-blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## 添加文章

1. 在 `content/posts/` 目录下创建 `.mdx` 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: "文章标题"
date: "2026-03-16"
description: "文章简介"
tags: ["标签1", "标签2"]
---

# 文章内容

这里是 Markdown 内容...
```

### 支持的 Markdown 特性

- 标题 (H1-H6)
- 段落和列表
- 代码块（支持语法高亮）
- 数学公式（KaTeX）
- 表格
- 引用
- 链接和图片

## 项目结构

```
my-blog/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页（文章列表）
│   ├── posts/[slug]/      # 文章详情页
│   ├── tags/              # 标签列表和详情
│   ├── search/            # 搜索页
│   └── layout.tsx         # 根布局
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── post-card.tsx     # 文章卡片
│   ├── mdx-content.tsx   # MDX 渲染器
│   └── search-bar.tsx    # 搜索组件
├── content/posts/         # Markdown 文章
├── lib/                   # 工具函数
│   ├── posts.ts          # 文章读取逻辑
│   ├── search.ts         # 搜索逻辑
│   └── utils.ts          # 工具函数
├── public/               # 静态资源
└── README.md
```

## 部署到 Vercel

### 方法一：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 方法二：Git 集成

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel Dashboard](https://vercel.com/dashboard) 导入项目
3. 选择框架预设为 Next.js
4. 点击 Deploy

### 环境变量（可选）

如果需要配置环境变量，在 Vercel Dashboard → Settings → Environment Variables 中添加：

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 自定义配置

### 修改主题颜色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### 修改分页数量

编辑 `src/lib/posts.ts`：

```typescript
export function getPaginatedPosts(page: number, perPage: number = 10) {
  // 修改 perPage 参数
}
```

## 许可证

MIT