---
name: blog-post
description: |
  Use this skill to create, review, or improve blog posts from raw ideas, notes, or drafts.
  Invoke when the user asks to "create a blog post", "write an article", "review my post",
  "improve the article", "turn these notes into a post", or any task related to blog content creation.
argument-hint: "[action] [topic-or-path]"
---

# Blog Post Workflow

This skill orchestrates the creation and review of blog posts for a personal Jekyll blog. It takes raw ideas, notes, or half-baked drafts and turns them into well-researched, well-structured posts that match the author's conversational, exploratory writing style.

## Site Context

- **Platform**: Jekyll, hosted on GitHub Pages
- **Posts directory**: `_posts/` with format `YYYY-MM-DD-slug.md`
- **Style**: Minimal (black text, white background, Times New Roman, no JavaScript)
- **Writing voice**: Conversational, authentic, exploratory, first-person
- **Topics**: Diverse (personal finance, health, tech, policy, life reflections)
- **Full style guide**: See `CLAUDE.md` at repo root

## Reference Materials

Research output is stored in:
- `.claude/skills/blog-post/references/` - Research notes organized by topic
- `.claude/skills/blog-post/references/sources/` - Downloaded source material
- `.claude/skills/blog-post/architecture/` - Article structure plans

## Available Actions

Based on the user's request, determine which action to take:

### 1. `research [topic]` - Gather Sources and Data

Use the **source-researcher** agent to:
- Search for authoritative sources (government data, academic papers, reputable journalism)
- Download and extract key data, statistics, and quotes
- Save research notes locally for the blog-writer to reference
- Build a bibliography of sources for the Resources section

### 2. `plan [topic-or-notes]` - Plan Article Structure

Use the **content-architect** agent to:
- Analyze the topic, notes, or existing draft
- Design article structure that fits the author's style
- Identify what research is still needed
- Plan where data, tables, images, and links should go
- Output a structure document

### 3. `write [topic-or-path]` - Write or Rewrite Content

Use the **blog-writer** agent to:
- Draft the full blog post (or rewrite an existing draft)
- Follow the author's writing style from CLAUDE.md exactly
- Incorporate research from the references directory
- Output a complete Jekyll post with proper front matter
- Place the file in `_posts/` with correct naming

### 4. `review [post-path]` - Full Review

Run two reviewers:
1. **editorial-reviewer** - Voice, style, flow, authenticity
2. **fact-checker** - Claims, data accuracy, source verification

Present a consolidated review report.

### 5. `editorial [post-path]` - Editorial Review Only

Use the **editorial-reviewer** agent for:
- Writing style match to author's voice
- Flow and transitions
- AI-voice pattern detection
- Opening paragraph strength (critical for RSS/newsletter)

### 6. `fact-check [post-path]` - Fact-Check Only

Use the **fact-checker** agent for:
- Verify statistics and data claims
- Check source accuracy
- Confirm dates, names, and figures
- Flag unsupported claims

### 7. `improve [post-path]` - Improve Based on Reviews

After reviews, use the **blog-writer** agent to:
- Address editorial feedback
- Fix factual issues
- Strengthen weak sections
- Maintain the author's voice throughout

### 8. `polish [post-path]` - Auto-Improve Until Publication Ready

Runs in a loop until editorial and fact-check reviewers both score 9/10 or above.

Process:
1. Run editorial-reviewer and fact-checker
2. If any score < 9/10:
   - Identify the lowest-scoring areas
   - Use blog-writer to address feedback
   - Re-run reviewers
3. Repeat until both score >= 9/10
4. Output final consolidated report

**Maximum iterations**: 5 (to prevent infinite loops)

## Full Article Creation Workflow

For creating a complete new post from an idea or notes:

```
Step 1: Research
/blog-post research [topic]
-> Gathers sources, data, statistics
-> Saves research notes locally

Step 2: Plan
/blog-post plan [topic-or-notes]
-> Designs article structure
-> Identifies gaps needing more research

Step 3: Write
/blog-post write [topic]
-> Creates full blog post draft in _posts/
-> Incorporates research and structure plan

Step 4: Polish (RECOMMENDED)
/blog-post polish [post-path]
-> Runs editorial + fact-check reviewers in a loop
-> Auto-improves until both >= 9/10
```

### Quick Single-Step Workflow

For when the user provides detailed notes and wants a post fast:

```
/blog-post write [topic]
-> Researches, plans, and writes in one pass
-> Then run: /blog-post polish [post-path]
```

## Post Location and Format

Posts are stored in `_posts/` with Jekyll front matter:

```markdown
---
layout: post
title: "Post Title Here"
date: YYYY-MM-DD
---

Post content in standard Markdown...
```

See CLAUDE.md for full formatting rules.

## Review Report Format

When running full review, consolidate findings:

```markdown
# Review: [Post Title]

## Scores
| Aspect | Score | Reviewer |
|--------|-------|----------|
| Editorial Quality | X/10 | editorial-reviewer |
| Factual Accuracy | X/10 | fact-checker |
| **Overall** | **X/10** | Combined |

## Critical Issues (Must Fix)
[Issues that block publication]

## Improvements
[Suggested enhancements]

## Strengths
[What works well]
```

## Agent Summary

| Agent | Purpose | Key Tools |
|-------|---------|-----------|
| source-researcher | Find sources, data, statistics | WebSearch, WebFetch, Write |
| content-architect | Plan article structure | Read, WebSearch, Write |
| blog-writer | Write content in author's voice | Read, Write, Edit, WebSearch |
| editorial-reviewer | Voice, style, flow review | Read, WebSearch |
| fact-checker | Verify claims and data | Read, WebSearch, WebFetch |

## Quick Commands

```
/blog-post research social-security-solvency
/blog-post plan credit-card-debt
/blog-post write _posts/2026-03-08-new-topic.md
/blog-post review _posts/2026-03-08-new-topic.md
/blog-post polish _posts/2026-03-08-new-topic.md
/blog-post editorial _posts/2026-03-08-new-topic.md
/blog-post fact-check _posts/2026-03-08-new-topic.md
/blog-post improve _posts/2026-03-08-new-topic.md
```
