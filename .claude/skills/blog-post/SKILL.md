---
name: blog-post
description: |
  Use this skill to create, review, or improve educational technical blog posts.
  Invoke when the user asks to "create a blog post", "write an article", "review my post",
  "improve the article", or any task related to educational ML content creation.
argument-hint: "[action] [topic]"
---

# Educational Blog Post Workflow

This skill orchestrates the creation and review of educational technical blog posts, drawing inspiration from Sebastian Raschka's writing style.

## Reference Materials

The following reference materials are available for style inspiration:
- `.claude/skills/blog-post/references/raschka-articles/` - Full downloaded articles organized by type
- `.claude/skills/blog-post/references/raschka-style-examples.md` - Writing patterns and examples
- `.claude/skills/blog-post/references/papers/` - Downloaded research papers (organized by topic)

**Note**: These patterns are guidance and inspiration, not strict requirements. Adapt them to fit the content naturally.

## Available Actions

Based on the user's request, determine which action to take:

### 1. `plan [topic]` - Plan a New Article
Use the **content-architect** agent to:
- Analyze the topic
- Design article structure
- Identify needed visualizations (check reusable components first)
- Plan code examples
- Set learning objectives

### 1b. `review-plan [architecture-doc]` - Review Architecture Before Writing
Use the **content-architecture-reviewer** agent to:
- Evaluate structure and narrative flow
- Identify missed visualization opportunities
- Check if reusable interactive components could be used
- Suggest clarity improvements
- Verify motivation is front-loaded

**Run this AFTER `plan` and BEFORE `write`.**

### 2. `research [topic]` - Gather Sources
Use the **source-researcher** agent to:
- Find primary papers
- **Download papers locally** (ar5iv HTML preferred, PDF fallback)
- Trace historical context
- Gather educational resources
- Build bibliography

### 3. `write [topic/section]` - Write Content
Use the **blog-writer** agent to:
- Draft the article or section
- Follow Raschka's style guidelines
- Include appropriate MDX components
- Add visualizations and code
- **Add article to content registry** (`src/components/ArticleContent.jsx`) for dev mode

### 4. `review [article-path]` - Full Review
Run the three content reviewers:
1. **editorial-reviewer** - Writing quality and engagement
2. **technical-reviewer** - Correctness and accuracy
3. **student-reviewer** - Accessibility and clarity

Present a consolidated review report.

**Note**: Visualization review is skipped by default (slow, uses browser). Use `visual-review` explicitly when needed.

### 5. `editorial [article-path]` - Editorial Review Only
Use the **editorial-reviewer** agent for:
- Writing style and engagement
- Article flow and transitions
- AI-voice pattern detection
- Ungrounded claims (overclaiming, company motivations without citation)
- Series cohesion (for multi-part articles)

### 6. `technical [article-path]` - Technical Review Only
Use the **technical-reviewer** agent for correctness verification.

### 7. `student [article-path]` - Student Review Only
Use the **student-reviewer** agent for accessibility analysis.

### 8. `visualize [topic/article]` - Design Visualizations
Use the **visualization-designer** agent to:
- Propose interactive React components (preferred over Mermaid)
- Design diagrams with Framer Motion animations
- Specify component requirements

### 9. `visual-review [article-path]` - Visual Review Only
Use the **visualization-reviewer** agent to:
- Render visualizations in browser
- Check legibility and contrast
- Test dark mode support
- Verify responsiveness
- Check animation performance

### 10. `improve [article-path]` - Improve Based on Reviews
After reviews, use the **blog-writer** agent to:
- Address editorial feedback
- Fix technical issues
- Clarify confusing sections
- Add missing content

### 11. `polish [article-path]` - Auto-Improve Until Publication Ready
**Runs in a loop until editorial, technical, and student reviewers all score 9/10 or above.**

Process:
1. Run editorial, technical, and student reviewers
2. If any score < 9/10:
   - Identify the lowest-scoring areas
   - Use blog-writer to address feedback
   - Re-run reviewers
3. Repeat until all three score >= 9/10
4. Output final consolidated report

**Maximum iterations**: 5 (to prevent infinite loops)

**Note**: Visualization review is skipped by default (slow, uses browser). Run `visual-review` separately when needed.

Usage:
```
/blog-post polish src/content/articles/foundations/my-article/index.mdx
```

This is the recommended way to finalize an article before publication.

## Full Article Creation Workflow

For creating a complete new article, follow this sequence:

```
Step 1: Plan
/blog-post plan [topic]
→ Creates detailed outline and structure
→ Identifies visualization opportunities

Step 2: Review Plan (IMPORTANT)
/blog-post review-plan [architecture-doc]
→ Reviews structure before writing begins
→ Checks for missed interactivity opportunities
→ Ensures reusable components are leveraged
→ Catches structural issues early

Step 3: Research
/blog-post research [topic]
→ Gathers and downloads papers, sources, citations

Step 4: Visualize
/blog-post visualize [topic]
→ Designs interactive React components (not Mermaid)

Step 5: Write
/blog-post write [topic]
→ Creates full article draft
→ **IMPORTANT**: Add article to registry in src/components/ArticleContent.jsx

Step 6: Polish (RECOMMENDED)
/blog-post polish [article-path]
→ Runs editorial, technical, student reviewers in a loop until all >= 9/10
→ Visualization review skipped by default (run separately with visual-review if needed)
```

### Alternative Manual Workflow

If you prefer manual control:

```
Step 5a: Review
/blog-post review [article-path]
→ Gets feedback from all four reviewers

Step 6a: Improve
/blog-post improve [article-path]
→ Addresses review feedback

Step 7a: Repeat
→ Continue review/improve until satisfied
```

## Article Location

Articles are stored in:
```
src/content/articles/[category]/[article-name]/index.mdx
```

Categories:
- `foundations` - Core ML concepts
- `models` - Model architectures
- `training` - Training techniques
- `optimization` - Efficiency improvements
- `applications` - Practical applications

**Important**: After creating a new article, add it to the content registry in `src/components/ArticleContent.jsx`:
```jsx
'category/article-name': lazy(() => import('@/content/articles/category/article-name/index.mdx')),
```
This enables fast dev mode navigation. Without the registry entry, articles will 404 in dev mode.

## Quick Commands

```
/blog-post plan attention-mechanisms
/blog-post research rlhf
/blog-post write foundations/rl-fundamentals
/blog-post review src/content/articles/foundations/my-article/index.mdx
/blog-post polish src/content/articles/foundations/my-article/index.mdx  # Auto-improve to 9/10+
/blog-post editorial ./current-draft.mdx
/blog-post technical ./current-draft.mdx
/blog-post student ./current-draft.mdx
/blog-post visual-review ./current-draft.mdx
/blog-post visualize attention-mechanisms
/blog-post improve ./current-draft.mdx
```

## Review Report Format

When running full review, consolidate findings:

```markdown
# Comprehensive Review: [Article Title]

## Overall Scores
| Aspect | Score | Reviewer |
|--------|-------|----------|
| Editorial Quality | X/10 | editorial-reviewer |
| Technical Accuracy | X/10 | technical-reviewer |
| Student Accessibility | X/10 | student-reviewer |
| Visual Quality | X/10 | visualization-reviewer |
| **Overall** | **X/10** | Combined |

## Critical Issues (Must Fix)
[Issues from all reviewers that block publication]

## High Priority Improvements
[Significant improvements from all reviewers]

## Visual Issues
[Rendering, legibility, dark mode, responsiveness issues]

## Nice-to-Have Enhancements
[Optional improvements]

## Detailed Reports
[Link to or include full reports from each reviewer]
```

## Integration with Available Components

The blog has these components available for articles:

**Educational:**
- `<Callout>` - Info, warning, tip, prerequisites boxes
- `<Prerequisites>` - List required knowledge
- `<TableOfContents>` - Auto-generated navigation
- `<Timeline>` - Historical evolution
- `<Comparison>` - Side-by-side analysis
- `<PaperReference>` - Paper citations
- `<Experiment>` - Results tables
- `<Definition>` - Clickable term definitions

**Visualizations (prefer custom React components):**
- Custom React/SVG components with Framer Motion (PREFERRED)
- `<InteractiveLineChart>` - Data visualization (Recharts)
- `<InteractiveAreaChart>` - Area charts (Recharts)
- `<InteractiveBarChart>` - Bar charts (Recharts)
- `<ParameterSlider>` - Interactive controls
- Avoid Mermaid - renders poorly across themes and devices

**RL-Specific:**
- `<MDPExplorer>` - Interactive gridworld
- `<ValueIteration>` - Algorithm visualization
- `<PolicyGradientViz>` - Gradient ascent
- `<PPOClipping>` - PPO objective visualization

**Code:**
- `<PythonPlayground>` - In-browser Python execution

## Topics from example.md

The blog aims to cover these topics (reference when planning):
- Reinforcement Learning (Bellman → modern RL)
- Attention mechanisms
- Transformer architecture
- Autoencoders (VAE, diffusion)
- Large Language Models
- Training techniques (pretraining, finetuning, LoRA)
- RLHF and modern alignment
- Optimization (KV-cache, attention variants)

## Agent Summary

| Agent | Purpose | Key Tools |
|-------|---------|-----------|
| content-architect | Plan article structure | Read, Glob, Grep, WebSearch |
| content-architecture-reviewer | Review plan before writing | Read, Glob, Grep, WebSearch |
| source-researcher | Find & download papers | WebSearch, WebFetch, Chrome, Write |
| blog-writer | Write content | Read, Write, Edit |
| editorial-reviewer | Writing quality, flow, AI-voice detection | Read, Glob, Grep, WebSearch, WebFetch, Write |
| technical-reviewer | Accuracy check | Read, Glob, Grep, WebSearch, WebFetch, Write, Bash |
| student-reviewer | Accessibility, math refreshers, proof formatting | Read, Glob, Grep, WebSearch, WebFetch, Write |
| visualization-designer | Design visuals | Read, WebSearch, Write, Chrome |
| visualization-reviewer | Verify visuals | Chrome browser tools |
