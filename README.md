# InsightsForge Blog

A personal blog built with [Astro](https://astro.build), MDX, Tailwind CSS, and React components. Deployed to GitHub Pages.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## 📝 Writing a Post

Create a new `.mdx` file in `src/content/blog/`:

```mdx
---
title: "My New Post"
description: "A short description for SEO and post cards."
pubDate: "2026-03-15"
tags: ["technology", "philosophy"]
author: "insightsmith"
draft: false
---

# My New Post

Write your content here in Markdown...
```

Set `draft: true` to hide a post from the live site while you work on it.

## 🏗️ Project Structure

```
insights-blog/
├── .github/workflows/deploy.yml  ← Auto-deploys on push to main
├── src/
│   ├── content/
│   │   └── blog/                 ← Your MDX blog posts live here
│   ├── components/               ← Reusable Astro + React components
│   ├── layouts/
│   │   └── BlogPost.astro        ← Layout wrapping every post
│   └── pages/
│       ├── index.astro           ← Home page (post listing)
│       └── blog/[...slug].astro  ← Dynamic post routes
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🌐 Deployment

Pushing to `main` automatically triggers a GitHub Actions build and deploys to:

```
https://insightsmith.github.io/insights-blog/
```

To enable GitHub Pages: **Settings → Pages → Source → GitHub Actions**.

## 🧩 Available Components

### `<Callout type="info|tip|warning|quote">`
Highlight important content in your MDX posts:

```mdx
import Callout from '../../components/Callout.tsx';

<Callout type="tip">
  This is a helpful tip for your readers.
</Callout>
```
