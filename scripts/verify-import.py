#!/usr/bin/env python3
"""Check imported source coverage, built content, assets, URLs and metadata.

Run after pnpm build. Requires beautifulsoup4. Source coverage also runs when the
importer's .firecrawl cache is available; artifact checks need no network access.
"""
import html
import json
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
DATA = json.loads((ROOT / 'src/data/website.json').read_text())
failures = []


def check(condition, message):
    if not condition:
        failures.append(message)


def normalize(text):
    return re.sub(r'\s+', '', html.unescape(text))


def target(path):
    candidate = DIST / unquote(path).lstrip('/')
    return candidate / 'index.html' if candidate.is_dir() or not candidate.suffix else candidate


source_checks = 0
for page in DATA['pages']:
    output = target(page['path'])
    check(output.exists(), f"Missing page: {page['path']}")
    if not output.exists():
        continue
    built = BeautifulSoup(output.read_text(), 'html.parser')
    content = built.select_one('.import-content')
    imported = BeautifulSoup(page['html'], 'html.parser')
    check(content is not None and normalize(content.get_text()) == normalize(imported.get_text()), f"Content mismatch: {page['path']}")
    check(len(built.select('h1')) == 1, f"Incorrect heading count: {page['path']}")
    check(normalize(built.h1.get_text()) == normalize(page['title']), f"Title mismatch: {page['path']}")
    check(built.html['lang'].startswith(page['locale']), f"Incorrect locale: {page['path']}")
    check(len(built.select('.team-card')) == len(page['team']), f"Team count mismatch: {page['path']}")
    for member in page['team']:
        check(normalize(member['bio']) in normalize(imported.get_text()), f"Missing biography: {member['name']}")
    cache = ROOT / '.firecrawl/rendered' / f"{page['id']}.html"
    if cache.exists():
        source = BeautifulSoup(cache.read_text(), 'html.parser')
        scope = source.select_one('article .content-inner') or source.select_one('#ajax-content-wrap > .container-wrap')
        for node in scope.select('script,style,noscript,svg,form,.nectar_team_bio,.row-bg-wrap'):
            node.decompose()
        # These repeated contact CTAs move to the shared layout.
        for row in scope.select('.wpb_row'):
            if row.parent is not None and any(h.get_text(' ', strip=True) in {'Nos gustan los Retos', 'We Like Challenges', 'We welcome Challenges'} for h in row.select('h1,h2,h3')):
                row.decompose()
        text = normalize(imported.get_text() + page['title'])
        for node in scope.select('p,li,h1,h2,h3,h4,h5,h6,blockquote,td,th'):
            value = normalize(node.get_text())
            if value:
                source_checks += 1
                check(value in text, f"Missing source text: {page['path']} {node.get_text(' ', strip=True)[:90]}")

files = sorted(DIST.rglob('*.html'))
for file in files:
    soup = BeautifulSoup(file.read_text(), 'html.parser')
    path = '/' + str(file.parent.relative_to(DIST)).strip('.')
    path = path.rstrip('/') + '/'
    if path == '/en/home/':
        continue  # Static redirect to the canonical English homepage.
    check(len(soup.select('h1')) == 1, f'Missing main heading: {path}')
    canonical = soup.select_one('link[rel="canonical"]')
    check(canonical and canonical['href'] == 'https://in2ai.com' + path, f'Incorrect canonical: {path}')
    for node in soup.select('a[href],img[src],link[rel="alternate"][href]'):
        value = node.get('href') or node.get('src')
        parts = urlsplit(value)
        if parts.hostname in {'in2ai.com', 'www.in2ai.com'}:
            check(node.name == 'link', f'Old-host link remains: {path} {value}')
        if value.startswith('/') or node.name == 'link' and parts.hostname == 'in2ai.com':
            destination = target(parts.path)
            check(destination.exists(), f'Broken local link: {path} {value}')
            if parts.fragment and destination.suffix == '.html' and destination.exists():
                other = BeautifulSoup(destination.read_text(), 'html.parser')
                check(other.find(id=unquote(parts.fragment)) is not None, f'Broken anchor: {path} {value}')
        elif value.startswith('#'):
            check(soup.find(id=unquote(value[1:])) is not None, f'Broken anchor: {path} {value}')
    check(not re.search(r'\[/?(?:vc_|nectar_|contact-form)', soup.get_text()), f'WordPress shortcode remains: {path}')

for asset in DATA['assets']:
    file = DIST / asset['path'].lstrip('/')
    check(file.exists() and file.stat().st_size > 0, f"Missing media: {asset['path']}")

archive_links = set()
for file in (DIST / 'blog').rglob('index.html'):
    soup = BeautifulSoup(file.read_text(), 'html.parser')
    archive_links.update(a['href'] for a in soup.select('main article a[href]'))
check(archive_links == {page['path'] for page in DATA['pages'] if page['kind'] == 'post'}, 'Blog archive does not cover every imported post')

if failures:
    print('\n'.join(failures))
    raise SystemExit(f'{len(failures)} migration checks failed.')
print(f"Verified {len(DATA['pages'])} imported records, {len(files)} built pages, {len(DATA['assets'])} media files and {source_checks} original content blocks.")
