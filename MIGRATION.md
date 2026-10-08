# Website content migration

The published content at [in2ai.com](https://in2ai.com/) was imported on 5 October 2026. The new homepage keeps the existing design and adds team, R&D and recent blog previews.

The source inventory contains 45 WordPress pages and 77 posts. The two homepages use the new landing component, the blog index uses a paginated archive, and the remaining 42 pages and all 77 posts use local content in `src/data/website.json`. Their original URLs are preserved. The build produces 129 routes, including seven blog archive pages and the `/en/home/` redirect.

The 103 imported media files are stored in `public/images/imported/`. These include portraits, article images, project illustrations and funding logos. Content pages and their media require no connection to WordPress at runtime. Linked external sources and product sites remain external.

The import preserves service descriptions, sector applications, team biographies and profile links, R&D projects, legal policies, article text, publication dates and existing language equivalents. Longer team biographies are available through native disclosure controls. Spanish and English content follows the original published translations. The Spanish team page contains 13 people, while the older English translation contains six. The blog is published in Spanish. Missing English articles do not advertise nonexistent language equivalents.

The contact form prepares a draft in the visitor's email application addressed to `info@in2ai.com`. It validates the name, email and privacy consent. Direct website delivery still needs a backend or form provider.

## Repeat the import

The importer uses the public WordPress API to inventory published records, then reads the rendered pages. The API alone is insufficient because it returns WPBakery shortcodes. Theme scripts and decorative wrappers are removed; text and semantic markup are retained. Source snapshots stay in the ignored `.firecrawl/` folder.

```bash
python3 -m venv .firecrawl/venv
.firecrawl/venv/bin/pip install -r scripts/requirements.txt
.firecrawl/venv/bin/python scripts/import-website.py
# Refetch the source instead of using cached snapshots:
.firecrawl/venv/bin/python scripts/import-website.py --refresh
```

The script overwrites `src/data/website.json`, so edit the importer if imported text needs a lasting correction. It reuses downloaded media and fails when a content page or media download fails.

## Verify

```bash
pnpm check
pnpm build
.firecrawl/venv/bin/python scripts/verify-import.py
git diff --check
```

The verification compares built text against the imported records, checks all local links, anchors, language equivalents and media, confirms complete blog archive coverage, and checks the source's individual content blocks when source snapshots are available.

Browser checks require the `agent-browser` CLI:

```bash
pnpm dev --background --host 0.0.0.0
python3 scripts/verify-browser.py
```

This checks representative Spanish and English pages at desktop and mobile sizes, image loading, horizontal overflow, the mobile menu and expanded biography controls. Screenshots and the report are saved in `.firecrawl/browser/`.
