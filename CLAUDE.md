# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` - starts the Nuxt development server on http://localhost:4396
- **Build**: `pnpm build` - builds the application for production
- **Generate**: `pnpm generate` - generates static site
- **Preview**: `pnpm preview` - preview production build locally
- **Install dependencies**: `pnpm install --shamefully-hoist`
- **Lint**: Uses ESLint via lint-staged for staged files during commit
- **Commit**: Uses commitizen with cz-git for conventional commits

## Architecture Overview

This is a **Nuxt 3 multilingual blog** with the following key characteristics:

### Core Technology Stack
- **Nuxt 3** with TypeScript
- **@nuxt/content** for markdown-based content management with PostgreSQL database
- **@nuxt/ui** for UI components with Tailwind CSS v4
- **@nuxtjs/i18n** for internationalization (English, Chinese, Japanese)
- **Maptalks** and **Three.js** for interactive maps and 3D visualizations
- **Mermaid** for diagram rendering
- **Swiper** for carousel components

### Content Structure
- Blog content organized under `content/blog/`:
  - `posts/` - main blog articles
  - `devlogs/` - development logs
- Static pages: `content/about.md`, `content/home.md`
- Content supports KaTeX math rendering and syntax highlighting

### Internationalization Setup
- Strategy: `no_prefix` with browser language detection (URLs stay same, language switches via cookie/selector)
- Base URL: `https://parz1.goder.club`
- Locales: `en` (default), `zh-CN`, `ja`
- Translation files in `i18n/lang/` directory with basic menu structure
- Language switching via dropdown component, no URL prefixes

### Component Architecture
- Components organized by purpose:
  - `base/` - foundational UI components
  - `Demo/` - interactive demo components for maps, swiper, etc.
  - `content/` - specialized content rendering components
  - `global/` - globally available components (like mermaid)

### Special Features
- **Ruby text hook**: Custom content processing via `rubyHook` for Japanese furigana (`{漢字|かんじ}` syntax)
- **PostgreSQL content database**: Content can be stored in database vs. filesystem
- **Theme switching**: Dark/light mode support
- **Interactive maps**: Multiple map implementations using Maptalks
- **Math rendering**: KaTeX integration for mathematical expressions

### Build & Deployment
- Uses **pnpm** as package manager with specific version pinning
- **Husky** git hooks for code quality
- **Commitizen** with conventional commits enforced via commitlint
- Prerendering configured for `/` and `/sitemap.xml`
- Vercel Analytics and Speed Insights integrated

### Code Quality
- ESLint with TypeScript, Vue, and Prettier plugins
- Lint-staged for pre-commit linting
- Conventional commit format enforced

## Development Notes

- When working with content, note the PostgreSQL database configuration in `nuxt.config.ts`
- Map components are client-side only (`.client.vue` suffix)
- The app uses custom elements for Swiper integration
- Content markdown supports both `remark-math` and `rehype-katex` for math rendering
- Ruby text processing happens via content hooks for Japanese content