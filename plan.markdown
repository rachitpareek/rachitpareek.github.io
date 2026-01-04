# Jekyll Migration Plan: Minimalist Personal Site Redesign

## Overview
Migrate rachithpareek.com from static HTML to Jekyll-powered minimalist site inspired by Dan Luu's aesthetic.

## Design Principles
- Minimal black text on white background
- Times New Roman typography (system default)
- Fast-loading, text-forward content
- No JavaScript unless absolutely necessary
- Clean, simple navigation

## Target Site Structure

```
/                   → Home (bio, key links)
/blog/              → Blog index (lists all posts in reverse chronological order)
/blog/[post-slug]   → Individual blog posts (filename based on topic)
/travel/            → Travel index (lists travel pages in reverse chronological order)
/travel/2024/       → Travel page for 2024 (one page per year)
/travel/2025/       → Travel page for 2025
/links/             → Links and contact
```

## Technical Implementation

### Phase 1: Jekyll Setup
1. **Create migration branch**
   - Branch: `jekyll-migration`
   - Keep `master` stable during development

2. **Add Jekyll configuration**
   - `_config.yml`: site metadata, build settings, custom domain
   - Set permalink structure for blog posts
   - Configure GitHub Pages compatibility

3. **Create directory structure**
   ```
   _layouts/          # Page templates
   _includes/         # Reusable components (header, nav, footer)
   _posts/            # Blog posts in Markdown (YYYY-MM-DD-title.md format)
   assets/
     css/             # Minimal stylesheet
   pages/             # Static pages (about, travel, links)
   ```

### Phase 2: Layout and Styling
1. **Create base layout** (`_layouts/default.html`)
   - Minimal HTML5 structure
   - Shared header with site navigation
   - Main content area
   - Optional simple footer

2. **Create reusable header** (`_includes/header.html`)
   - Site title/name
   - Navigation links: Home | Blog | Travel | Links
   - Plain text, no fancy styling

3. **Create minimal CSS** (`assets/css/main.css`)
   - Black text on white background
   - Times New Roman font stack
   - Minimal spacing and typography
   - Responsive but simple
   - No frameworks, pure CSS

4. **Create post layout** (`_layouts/post.html`)
   - Extends default layout
   - Shows post title, date
   - Post content
   - Back to blog link

### Phase 3: Content Pages
1. **Home page** (`index.md`)
   - Short bio/introduction
   - Key links (LinkedIn, GitHub, etc.)
   - Link to blog and other sections

2. **Blog index** (`blog/index.html`)
   - List all posts in reverse chronological order
   - Display format: `YYYY-MM-DD | Post Title` (date shown with each post)
   - Links to individual post pages
   - Simple list format (like Dan Luu)

3. **Travel index** (`travel/index.html`)
   - List all travel pages in reverse chronological order
   - Display format: `YYYY | Travel Title/Description`
   - Links to individual travel year pages
   - Simple list format

4. **Travel year pages** (e.g., `travel/2024.md`, `travel/2025.md`)
   - One page per year
   - Content about travels for that year
   - Markdown format

5. **Links/Contact page** (`links.md`)
   - Social links
   - Email (obfuscated or simple display)
   - Optional: formspree.io integration later

### Phase 4: Blog and Travel Content
1. **First blog post**: RSI resources and experience
   - File: `_posts/YYYY-MM-DD-rsi-resources.md` (Jekyll requires date prefix)
   - Displayed as: `YYYY-MM-DD | Understanding RSI` (date shown in blog index)
   - Markdown format with front matter (title, date, layout)
   - URL will be topic-based: `/blog/rsi-resources/` or similar
   - Categories/tags as needed

2. **Initial travel content**
   - Create at least one travel year page as example
   - Format: `travel/YYYY.md` (e.g., `travel/2024.md`)
   - Front matter includes year and any metadata

### Phase 5: Migration and Deployment
1. **Remove old files**
   - Delete current HTML files (index.html, companies.html, ideas.html, blogs_home.html)
   - Clean up unused assets
   - Keep LICENSE.txt

2. **Configure GitHub Pages**
   - Ensure `_config.yml` has correct `baseurl` and `url`
   - Set custom domain: rachithpareek.com
   - Keep CNAME file for custom domain

3. **Add robots.txt**
   ```
   User-agent: *
   Allow: /
   ```

4. **Local testing**
   - Run `bundle exec jekyll serve`
   - Test all pages and navigation
   - Verify mobile responsiveness

5. **Deploy**
   - Merge to master
   - Push to GitHub
   - Verify GitHub Pages build succeeds
   - Test live site

## File Changes Summary

### Files to Create
- `_config.yml`
- `_layouts/default.html`
- `_layouts/post.html`
- `_includes/header.html`
- `_includes/footer.html` (optional)
- `assets/css/main.css`
- `index.md`
- `blog/index.html` (lists all blog posts)
- `travel/index.html` (lists all travel pages)
- `travel/YYYY.md` (one or more travel year pages)
- `links.md`
- `_posts/YYYY-MM-DD-[topic].md` (blog posts with topic-based names)
- `Gemfile` (for local Jekyll development)
- `robots.txt`

### Files to Delete
- `index.html`
- `companies.html`
- `ideas.html`
- `blogs_home.html`
- `main.js` (if no longer needed)
- Unused files in `assets/` and `images/` directories

### Files to Keep
- `LICENSE.txt`
- `resume.pdf`
- `.gitignore` (update for Jekyll)
- `CNAME` (if exists for custom domain)

## Jekyll Configuration Notes

### GitHub Pages Compatibility
- Use GitHub Pages-compatible plugins only
- Default supported: jekyll-feed, jekyll-seo-tag, jekyll-sitemap
- Or use GitHub Actions for custom build (future option)

### Permalink Structure
Use topic-based URLs: `/blog/:title/`
- Jekyll posts still require `YYYY-MM-DD-topic.md` filename format in `_posts/` directory
- But the URL will be clean and topic-based
- Date is displayed in the blog index, not in the URL

### Blog Post Filename Convention
- **Filename**: `_posts/YYYY-MM-DD-topic-name.md` (required by Jekyll)
- **Display**: Date shown separately on blog index (e.g., "2024-12-15 | Topic Name")
- **URL**: `/blog/topic-name/` (clean, topic-based)

## Success Criteria
- [ ] Site loads fast (minimal CSS, no JS bloat)
- [ ] Clean, readable typography
- [ ] All sections accessible via navigation
- [ ] At least one blog post published
- [ ] Mobile-responsive
- [ ] Custom domain works
- [ ] No broken links

## Future Enhancements (Post-Migration)
- Add sitemap.xml
- Contact form integration (formspree.io)
- RSS feed for blog
- Analytics (optional, privacy-respecting)
- More blog posts and travel content

## Timeline
- Phase 1-2: Jekyll setup and layouts
- Phase 3: Content pages
- Phase 4: Blog and travel content
- Phase 5: Testing and deployment

## Notes
- Start fresh, don't preserve old content
- Keep it simple and maintainable
- Focus on content over design
- Can always enhance later
