# 部署指南

## 部署到 Vercel

### 方法一：使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**

```bash
npm i -g vercel
```

2. **登录 Vercel**

```bash
vercel login
```

3. **部署项目**

```bash
cd my-blog
vercel
```

按照提示完成配置：
- 确认项目路径
- 选择或创建项目
- 确认部署设置

4. **查看部署结果**

部署完成后，Vercel 会提供访问链接：

```
🔍  Inspect: https://vercel.com/your-username/my-blog/xxx
✅  Production: https://my-blog-xxx.vercel.app
```

### 方法二：Git 集成（自动部署）

1. **推送代码到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/my-blog.git
git push -u origin main
```

2. **在 Vercel 导入项目**

- 访问 [Vercel Dashboard](https://vercel.com/dashboard)
- 点击 "Add New..." → "Project"
- 选择你的 GitHub 仓库
- 确认框架预设为 "Next.js"
- 点击 "Deploy"

3. **配置自动部署**

每次推送代码到 main 分支，Vercel 会自动重新部署。

### 方法三：手动上传

1. **构建项目**

```bash
cd my-blog
npm run build
```

2. **部署 dist 目录**

```bash
vercel --prod dist
```

## 配置自定义域名

1. 在 Vercel Dashboard → Project → Settings → Domains
2. 添加你的域名（如 `blog.yourdomain.com`）
3. 按照提示配置 DNS 记录

## 环境变量配置

如果需要配置环境变量：

1. Vercel Dashboard → Project → Settings → Environment Variables
2. 添加变量：

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 常见问题

### 1. 构建失败

检查 `next.config.ts` 是否正确配置了静态导出：

```typescript
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
};
```

### 2. 图片无法显示

静态导出不支持 Next.js Image 组件的优化功能。确保：
- 使用 `unoptimized: true`
- 或者使用普通 `<img>` 标签

### 3. 搜索功能不工作

搜索功能在静态导出中需要：
- 构建时生成搜索索引
- 前端使用 Fuse.js 进行搜索

如果搜索返回空结果，检查：
- `content/posts/` 目录是否有文章
- 文章 frontmatter 格式是否正确

## 更新部署

### 更新文章内容

1. 修改或添加 `content/posts/` 目录下的 `.mdx` 文件
2. 提交代码：

```bash
git add .
git commit -m "Add new post"
git push
```

3. Vercel 会自动重新部署

### 手动重新部署

```bash
vercel --prod
```

## 本地预览生产构建

```bash
npm run build
npx serve dist
```

访问 http://localhost:3000 预览生产版本。