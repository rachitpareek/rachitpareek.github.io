# Project Standards for Claude Code

## Overview
This is a minimalist personal website and blog built with Jekyll and hosted on GitHub Pages. The design prioritizes simplicity, speed, and readability over visual complexity.

## Design Principles
- **Minimal aesthetic**: Black text on white background, inspired by Dan Luu's style
- **Typography**: Times New Roman (system default), no special fonts
- **No JavaScript**: Site should be fast-loading and text-forward
- **Clean navigation**: Simple footer navigation, centered site header
- **Content-focused**: Writing and ideas matter more than design

## Creating New Blog Posts

When asked to create a new blog post, follow these rules exactly:

### File Location and Naming
- **Directory**: Always write to `_posts/`
- **Filename format**: `YYYY-MM-DD-slug.md` (Jekyll requirement)
  - Example: `2025-01-04-understanding-dns.md`
  - Use lowercase, hyphens for spaces, descriptive slug
  - Date must match the post date in front matter

### Required YAML Front Matter
Every blog post must start with:
```yaml
---
layout: post
title: "Your Post Title Here"
date: YYYY-MM-DD
---
```

### Content Style and Tone

The author's writing style is **conversational, authentic, and deliberately exploratory**. When transforming raw notes or dictations into blog posts, preserve these key characteristics:

#### Voice and Authenticity
- **Conversational and authentic**: Write as the author thinks and speaks, with natural flow
- **Self-aware with qualifiers**: Embrace uncertainty ("I don't know...", "at least until...", "I think...")
- **Parenthetical asides**: Use parentheses liberally for tangential thoughts and clarifications
- **Honest about limitations**: Acknowledge gaps in knowledge, forgotten conclusions, or work-in-progress thinking
- **Humble and exploratory**: Avoid authoritative tone; writing is for process and reflection, not definitive conclusions
- **Stream-of-consciousness welcome**: Don't over-structure where natural thought flow works better

#### Formatting and Structure
- **Minimal formality**: Relaxed but thoughtful; invite readers into the thought process
- **Light structure only**: Add headings/lists only when content genuinely demands it
- **Preserve natural pacing**: Keep run-on thoughts when they maintain authentic flow
- **Paragraph breaks for readability**: But don't force rigid organization
- **First-person perspective**: This is a personal blog, write from "I"

#### When Processing Raw Notes/Dictations
- Fix obvious punctuation, grammar, and transcription errors
- Break up run-on sentences only when clarity truly demands it
- Preserve intentional informal elements (fragments, asides, casual connectors like "well", "so", "I mean")
- Keep the exploratory, thinking-out-loud quality
- Don't impose conclusions or tidy endings if the thought is genuinely open-ended

#### Handling Formatting Instructions
When raw notes include formatting instructions, apply the formatting instead of keeping the instruction:
- **"underline this text"** or **"this should be underlined"** → Remove the instruction and apply markdown: `<u>this text</u>` or just use emphasis
- **"italicize this"** or **"make this italic"** → Remove the instruction and apply: `*this text*`
- **"bold this"** or **"make this bold"** → Remove the instruction and apply: `**this text**`
- Any other formatting indicators → Interpret and apply the appropriate markdown syntax, don't leave the instruction in the text

#### Handling Image Placeholders
When raw notes reference images or pictures:

**Initial PR creation:**
- If notes say things like "picture one", "image showing X", "screenshot of Y", leave a placeholder comment in the markdown: `<!-- Image: description goes here -->`
- Do NOT add image markdown syntax yet since images aren't uploaded

**After user uploads images to PR comments:**
- When user says "I've added the pictures to the PR" or "I've uploaded images to the PR comments"
- Read the PR comments to see the uploaded images
- Get the GitHub-hosted URLs for each image (in the order they appear in PR comments)
- Replace the placeholder comments with proper markdown image syntax: `![description](github-url)`
- Match images to their placeholders based on order and description
- **Always add a caption** on the line immediately below the image using italic text: `*description*`
- The caption should be the same as the image description
- Format example:
  ```markdown
  ![Gap as a proportion of GDP](https://github.com/user-attachments/assets/image-url.png)
  *Gap as a proportion of GDP*
  ```
- Update the post with the image references and captions

#### What NOT to Do with Writing
- **Don't over-polish**: Maintain raw, authentic quality over formal perfection
- **Don't remove uncertainty**: Self-aware commentary is a feature, not a bug
- **Don't impose heavy structure**: Avoid academic tone or forced organization
- **Don't eliminate casual language**: Conversational phrasing is intentional
- **Don't add content**: Only work with what's in the original notes
- **Don't force transitions**: Let ideas flow naturally, even if connections are loose
- **Don't use em-dashes**: Use parentheses for asides, commas for pauses, or split into separate sentences
- **Don't start sentences with filler words**: Avoid starting sentences with "So", "Well", or similar prepositions/connectors (but these are fine mid-sentence)

### Markdown Formatting
- Use standard Markdown syntax
- External links: `[Link Text](https://example.com)`
- Internal links: `[Link Text]({{ site.baseurl }}/path/)`
- Code blocks: Use triple backticks with language identifier
- Headings: Start with `##` (h2), reserve h1 for post title

### What NOT to Do
- **Do not modify other files** unless explicitly requested
- **Do not change site layout** or styling
- **Do not add JavaScript** or external dependencies
- **Do not create unnecessary files** (no supporting images, assets, etc. unless requested)
- **Do not use emojis** unless explicitly requested by the user

## Site Structure Reference

```
/                   → Home (shows 3 recent posts)
/blog/              → Blog index (all posts, reverse chronological)
/blog/[post-slug]   → Individual post page
/travel/            → Travel index
/travel/YYYY/       → Yearly travel pages
/about/             → About/contact page
/nonprofits/        → Nonprofits page
/experience/        → Experience page
/ideas/             → Ideas page
```

## Existing Files to Preserve
- `_config.yml` - Site configuration
- `_layouts/` - Page templates
- `_includes/` - Reusable components (header, footer)
- `assets/css/main.css` - Minimal stylesheet
- `pages/` - Static pages (about, nonprofits, experience, ideas)
- `travel/` - Travel content
- `CNAME` - Custom domain configuration
- `.gitignore`, `Gemfile`, `LICENSE.txt`

## GitHub Workflow
- Work in feature branches, not directly in master
- Commit messages should be clear and descriptive
- Include co-authorship: `Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>`

## Questions and Clarifications
If the user's request is ambiguous:
- Ask specific questions about content, tone, or structure
- Suggest options when multiple approaches are valid
- Confirm before making changes that affect multiple files
