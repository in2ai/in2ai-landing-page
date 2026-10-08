#!/usr/bin/env python3
"""Import published In2AI content. Requires beautifulsoup4; use --refresh to refetch.

The public API inventories records; the rendered website supplies the content,
because its API exposes unexpanded WPBakery shortcodes. No CMS runtime is needed.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor
from hashlib import sha256
import html
import json
from pathlib import Path
import re
import time
from urllib.parse import unquote, urljoin, urlsplit
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup, Tag

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / '.firecrawl'
ORIGIN = 'https://in2ai.com'
REFRESH = argparse.ArgumentParser(description=__doc__)
REFRESH.add_argument('--refresh', action='store_true')
ARGS = REFRESH.parse_args()
CACHE.mkdir(exist_ok=True)


def fetch(url, cache):
    if cache.exists() and not ARGS.refresh:
        return cache.read_bytes()
    for attempt in range(3):
        try:
            with urlopen(Request(url, headers={'User-Agent': 'In2AI-content-migration/1.0'}), timeout=45) as response:
                data = response.read()
            cache.parent.mkdir(parents=True, exist_ok=True)
            cache.write_bytes(data)
            return data
        except Exception:
            if attempt == 2:
                raise
            time.sleep(attempt + 1)


def inventory(kind):
    records, page = [], 1
    while True:
        batch = json.loads(fetch(f'{ORIGIN}/wp-json/wp/v2/{kind}?per_page=100&page={page}', CACHE / f'wp-{kind}-{page}.json'))
        records.extend(batch)
        if len(batch) < 100:
            return records
        page += 1


pages, posts = inventory('pages'), inventory('posts')
paths = {urlsplit(record['link']).path for record in pages + posts} | {'/', '/en/'}
assets = {}


def local_url(value, source):
    absolute = urljoin(source, value)
    parts = urlsplit(absolute)
    if parts.hostname not in {'in2ai.com', 'www.in2ai.com'}:
        return absolute
    if parts.path.startswith('/wp-content/uploads/'):
        # Include a URL hash so two files with identical basenames cannot collide.
        name = re.sub(r'[^A-Za-z0-9._-]', '-', unquote(parts.path.rsplit('/', 1)[-1]))
        target = f'/images/imported/{sha256(absolute.encode()).hexdigest()[:10]}-{name}'
        assets[absolute] = target
        return target
    path = parts.path.rstrip('/') + '/'
    if path == '/en/home/':
        path = '/en/'
    if path not in paths and path.endswith('/contacto/'):
        path = '/contacto/'
    return path + (f'?{parts.query}' if parts.query else '') + (f'#{parts.fragment}' if parts.fragment else '')


def image_source(node):
    return node.get('data-nectar-img-src') or node.get('data-src') or node.get('src', '')


def clean(scope, source):
    for frame in scope.select('iframe[src]'):
        link = BeautifulSoup('<p><a></a></p>', 'html.parser').p
        link.a['href'] = frame['src']
        link.a.string = 'Vídeo' if '/en/' not in source else 'Video'
        frame.replace_with(link)
    for node in scope.select('script,style,noscript,svg,form,iframe,.nectar-shape-divider-wrap,.row-bg-wrap,.nectar_team_bio,.team-member-overlay,.nectar_team_bio_img'):
        node.decompose()
    # The shared contact CTA is rendered once by the new page layout.
    for row in scope.select('.wpb_row'):
        if row.parent is None:
            continue
        if any(h.get_text(' ', strip=True) in {'Nos gustan los Retos', 'We Like Challenges', 'We welcome Challenges'} for h in row.select('h1,h2,h3')):
            row.decompose()
    for node in scope.select('.nectar-cta'):
        if not node.get_text(' ', strip=True):
            node.decompose()
    for card in scope.select('.team-member'):
        card['class'] = ['team-card']
        role = card.select_one('h5')
        if role:
            role['class'] = ['team-role']
        name = card.select_one('h3')
        image = card.select_one('img')
        if image and name:
            image['alt'] = name.get_text(' ', strip=True)
    # Retain useful profile links from the original biographies before stripping
    # decorative theme wrappers. These are stored separately by extract().
    allowed = {'div', 'section', 'article', 'details', 'summary', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'img', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'br', 'blockquote', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'video', 'source', 'hr', 'sup', 'sub', 'span'}
    top_rows = {id(node) for node in scope.select('.wpb_row') if not node.find_parent(class_='wpb_row')}
    for node in list(scope.find_all(True)):
        if node.parent is None:
            continue
        if node.name not in allowed:
            node.unwrap()
            continue
        classes = node.get('class', [])
        retained = {}
        if node.name == 'h1':
            node.name = 'h2'
        if node.name == 'a':
            href = node.get('href', '')
            if not href or href.startswith('#'):
                node.unwrap()
                continue
            retained['href'] = local_url(href, source)
            if urlsplit(retained['href']).scheme in {'javascript', 'data'}:
                node.unwrap()
                continue
        elif node.name in {'img', 'source', 'video'}:
            src = image_source(node)
            if not src or src.startswith('data:'):
                node.decompose()
                continue
            retained['src'] = local_url(src, source)
            if node.name == 'img':
                retained.update(alt=node.get('alt', ''), loading='lazy', decoding='async')
                for dimension in ['width', 'height']:
                    if str(node.get(dimension, '')).isdigit():
                        retained[dimension] = node[dimension]
            elif node.name == 'video':
                retained['controls'] = ''
        if 'team-card' in classes or 'team-role' in classes:
            retained['class'] = 'team-card' if 'team-card' in classes else 'team-role'
        elif id(node) in top_rows:
            node.name = 'section'
            retained['class'] = 'import-section'
        elif node.name in {'div', 'span'}:
            node.unwrap()
            continue
        node.attrs = retained
    for node in list(scope.select('p,a,section')):
        if not node.get_text(strip=True) and not node.select('img,video'):
            node.decompose()
    return ''.join(str(child) for child in scope.contents).strip()


def extract(record):
    source = record['link']
    path = urlsplit(source).path
    locale = 'en' if path.startswith('/en/') else 'es'
    soup = BeautifulSoup(fetch(source, CACHE / 'rendered' / f"{record['id']}.html"), 'html.parser')
    scope = soup.select_one('article .content-inner') or soup.select_one('#ajax-content-wrap > .container-wrap')
    if scope is None:
        raise ValueError(f'No content container: {source}')
    team = []
    for card in scope.select('.team-member'):
        name, role, bio = card.select_one('h3'), card.select_one('h5'), card.select_one('.nectar_team_bio')
        image, profile = card.select_one('img'), card.select_one('.nectar_team_bio a')
        team.append({'name': name.get_text(' ', strip=True), 'role': role.get_text(' ', strip=True) if role else '', 'bio': bio.get_text(' ', strip=True) if bio else '', 'image': local_url(image_source(image), source) if image else '', 'linkedin': profile.get('href', '') if profile else ''})
        summary = card.select_one('.team-meta p')
        if bio and summary and bio.get_text(' ', strip=True) != summary.get_text(' ', strip=True):
            details = soup.new_tag('details')
            label = soup.new_tag('summary')
            label.string = 'Biografía completa' if locale == 'es' else 'Full biography'
            paragraph = soup.new_tag('p')
            paragraph.string = bio.get_text(' ', strip=True)
            details.extend([label, paragraph])
            card.select_one('.team-meta').append(details)
        if profile and profile.get('href'):
            link = soup.new_tag('a', href=profile['href'])
            link.string = 'LinkedIn'
            card.select_one('.team-meta').append(link)
    heading = scope.select_one('h1') if record['type'] == 'page' and not team else None
    title = heading.get_text(' ', strip=True) if heading else html.unescape(record['title']['rendered'])
    if heading:
        heading.decompose()
    alternates = []
    for link in soup.select('link[rel="alternate"][hreflang]'):
        code = link['hreflang'].split('-')[0]
        alternate = urlsplit(link['href']).path
        if code in {'es', 'en'} and alternate in paths:
            alternates.append({'locale': code, 'path': '/en/' if alternate == '/en/home/' else alternate})
    if not alternates:
        alternates = [{'locale': locale, 'path': path}]
    image = soup.select_one('meta[property="og:image"]')
    author = soup.select_one('.meta-author a')
    content = clean(scope, source)
    text = BeautifulSoup(content, 'html.parser').get_text(' ', strip=True)
    if not text:
        raise ValueError(f'Empty content: {source}')
    paragraph = BeautifulSoup(content, 'html.parser').select_one('p')
    description = paragraph.get_text(' ', strip=True) if paragraph else text
    return {'id': record['id'], 'path': path, 'locale': locale, 'kind': 'post' if record['type'] == 'post' else 'page', 'title': title, 'description': description[:200], 'date': record['date'][:10], 'modified': record['modified'][:10], 'author': author.get_text(' ', strip=True) if author else 'In2AI', 'image': local_url(image['content'], source) if image and record['type'] == 'post' else '', 'source': source, 'alternates': alternates, 'team': team, 'html': content}


records = [p for p in pages if urlsplit(p['link']).path not in {'/', '/en/home/', '/blog/'}] + posts
with ThreadPoolExecutor(max_workers=4) as pool:
    imported = list(pool.map(extract, records))


def download(asset):
    url, path = asset
    fetch(url, ROOT / 'public' / path.lstrip('/'))


with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(download, list(assets.items())))

data = {'source': ORIGIN, 'pages': sorted(imported, key=lambda p: p['path']), 'assets': [{'source': source, 'path': path} for source, path in sorted(assets.items())]}
(ROOT / 'src/data').mkdir(exist_ok=True)
(ROOT / 'src/data/website.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
print(f"Imported {len(imported)} records ({len(posts)} posts), {len(assets)} local assets.")
