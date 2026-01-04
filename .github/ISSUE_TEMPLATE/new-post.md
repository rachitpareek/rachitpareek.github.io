---
name: New Blog Post
about: Request Claude to write a new blog post
title: '[POST] '
labels: blog-post
assignees: ''
---

## Post Details

**Title:**
<!-- The title of your blog post -->

**Date:**
<!-- Publication date in YYYY-MM-DD format (e.g., 2025-01-04) -->

**Slug:**
<!-- Optional: URL-friendly slug (e.g., "understanding-dns"). If not provided, Claude will generate from title -->

## Content

**Raw notes / Outline:**
<!--
Provide your thoughts, notes, or outline here. Claude will structure this into a complete blog post.
Include:
- Key points you want to cover
- Any specific examples or anecdotes
- Links to reference
- Tone preferences (if different from default conversational style)
-->

## Instructions for @claude

@claude Please create a new blog post based on the information above. Follow the project standards in CLAUDE.md:
- Create file in `_posts/` with filename `YYYY-MM-DD-slug.md`
- Include proper YAML front matter
- Use clear, conversational tone
- Structure content with headings and lists for readability
- Open a PR with the new post when done

<!--
Additional instructions or context for Claude (optional):
-->
