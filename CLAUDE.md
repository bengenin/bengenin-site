# CLAUDE.md — bengenin-site

## Project Overview

Personal portfolio/landing page for Ben Genin (Lead AE @ LinkedIn). A minimal, single-file static website hosted on Vercel. There is no build system, no framework, and no dependencies.

## Repository Structure

```
bengenin-site/
├── index.html      # The entire site — HTML, CSS, and any JS in one file
├── avatar.jpg      # Profile photo
├── cv.pdf          # Resume (linked via mailto, not direct download)
├── favicon.png     # Browser tab icon (also has inline SVG emoji favicon in <head>)
├── og-image.jpg    # Open Graph image for social sharing
└── CLAUDE.md       # This file
```

## Architecture

- **Single-file site**: All HTML structure, CSS styles, and any interactivity live in `index.html`. Do not split into separate files unless explicitly asked.
- **No build step**: Changes to `index.html` are deployed directly. There is no `npm install`, `build`, or `compile` step.
- **No JavaScript framework**: The page uses vanilla HTML/CSS with minimal inline JS (e.g., smooth scroll on CTA button click).
- **Embedded chatbot**: An AI chat widget is embedded via a Chatbase iframe (`chatbot-iframe/7WKehRDT0GFL74DSSIm8h`). Do not change the iframe `src` unless explicitly instructed.
- **Hosted on Vercel**: Deployment is automatic on push to `master`.

## CSS Conventions

CSS custom properties (variables) are defined in `:root` and used throughout:

| Variable | Purpose |
|---|---|
| `--bg-primary` | Page background (`#fafafa`) |
| `--bg-secondary` | Card/component background (`#ffffff`) |
| `--bg-hover` | Hover state background |
| `--text-primary` | Main text color (`#222`) |
| `--text-secondary` | Secondary text (`#555`) |
| `--text-tertiary` | Tertiary text (`#888`) |
| `--text-muted` | Muted/decorative text (`#999`) |
| `--border-color` | Subtle borders |
| `--border-input` | Input/button borders |
| `--shadow-sm/md/lg` | Box shadow scale |
| `--linkedin-blue` | LinkedIn brand color (`#0A66C2`) |

**Always use these variables** for colors and shadows rather than hardcoded values to ensure visual consistency.

## Responsive Design

- Single breakpoint at `640px` (`@media (max-width: 640px)`)
- Mobile: stacked nav links (column layout, dividers hidden), smaller font sizes, reduced margins
- Always test changes at both desktop and mobile viewport widths

## Key Sections in index.html

1. **`<head>`** — meta tags, inline SVG emoji favicon, embedded `<style>` block
2. **`<header>`** — Name heading + tagline with LinkedIn inline SVG icon
3. **`<nav>`** — Links row with vertical dividers: cv (mailto), linkedin, contact (mailto), github
4. **`<main>`** — CTA button (scrolls to chat) + `#chat-section` with Chatbase iframe
5. **`<footer>`** — Tennis emoji + copyright line

## Inline SVGs

LinkedIn and GitHub icons are inlined as raw SVG `<path>` elements (no external icon library). When adding new icons, maintain this pattern — no external icon CDN or library imports.

## Content Details

- **Email**: ben.genin8@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/ben-genin/
- **GitHub**: https://github.com/bengenin
- **CV link**: Sends a mailto with pre-filled subject/body requesting resume (not a direct PDF link)
- **Chatbase bot ID**: `7WKehRDT0GFL74DSSIm8h`

## Development Workflow

### Making Changes
1. Edit `index.html` directly — all changes go here
2. No linting, testing, or compilation required
3. Preview by opening `index.html` in a browser locally

### Git Conventions
- Branch: work on `claude/claude-md-mmf1pdk73ie1k4dq-dzOGt` (or the designated Claude session branch)
- Commit messages follow the pattern: `Update index.html` (project convention from git history)
- Push to trigger Vercel deploy: `git push -u origin <branch-name>`

### Deployment
- Vercel auto-deploys from `master`
- No CI/CD pipeline or build commands configured

## What NOT to Do

- Do not introduce JavaScript frameworks (React, Vue, etc.)
- Do not add a `package.json` or build tooling unless explicitly requested
- Do not split CSS into a separate file unless asked
- Do not change the Chatbase iframe `src` without explicit instruction
- Do not add tracking scripts, analytics, or third-party CDN imports without being asked
- Do not alter the CV link behavior (it intentionally uses mailto, not a direct PDF link)
