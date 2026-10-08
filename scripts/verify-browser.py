#!/usr/bin/env python3
"""Check the running site at desktop and mobile sizes using agent-browser.

Requires agent-browser. Start pnpm dev --background, then run this script.
Screenshots and the result report are written to the ignored .firecrawl folder.
"""
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / '.firecrawl/browser'
OUTPUT.mkdir(parents=True, exist_ok=True)
SESSION = f'in2ai-content-check-{os.getpid()}'
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4321'


def run(*args, script=None):
    result = subprocess.run(['agent-browser', '--session', SESSION, '--json', *args], input=script, text=True, capture_output=True, timeout=45)
    if result.returncode:
        raise RuntimeError(result.stderr or result.stdout)
    return json.loads(result.stdout)


def evaluate(script):
    result = run('eval', '--stdin', script=script)
    if not result.get('success'):
        raise RuntimeError(result)
    return result['data']['result']


paths = ['/', '/en/', '/nuestroequipo/', '/en/ourteam/', '/investigacion-desarrollo/', '/en/rd/', '/retail/', '/blog/', '/blog/page/7/', '/in2ai-seleccionada-para-el-stage-1-de-ai-on-demand-con-asm2/', '/contacto/', '/en/contact/', '/politicaprivacidad/', '/en/cookiespolicy/']
checks = []
try:
    run('open', BASE + '/')
    for width in [1280, 390]:
        run('set', 'viewport', str(width), '850')
        for path in paths:
            run('open', BASE + path)
            result = evaluate('''(async () => {
              await document.fonts.ready;
              const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
              // Exercise actual reveal observers and lazy image loading.
              for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight * 0.8) {
                scrollTo({top: y, behavior: 'instant'});
                await pause(25);
              }
              await pause(300);
              scrollTo({top: 0, behavior: 'instant'});
              await pause(100);
              return {
                title: document.title,
                lang: document.documentElement.lang,
                headings: document.querySelectorAll('h1').length,
                overflow: document.documentElement.scrollWidth > innerWidth,
                brokenImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
                hiddenReveals: [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length,
                contactForm: !document.querySelector('[data-contact-form]') || document.querySelector('[data-contact-form]').action === 'mailto:info@in2ai.com'
              };
            })()''')
            result.update(path=path, width=width)
            assert result['headings'] == 1 and not result['overflow'] and not result['brokenImages'] and result['contactForm'], result
            assert result['lang'].startswith('en' if path.startswith('/en/') else 'es'), result
            checks.append(result)
            if path in ['/', '/nuestroequipo/', '/blog/']:
                name = path.strip('/').replace('/', '-') or 'home'
                run('screenshot', str(OUTPUT / f'{name}-{width}.png'))
            print(f'PASS {width}px {path}', flush=True)
    run('set', 'viewport', '390', '850')
    run('open', BASE + '/')
    run('snapshot', '-i')
    run('click', '[data-menu-toggle="nav-mobile"]')
    assert evaluate("document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded')") == 'true'
    run('press', 'Escape')
    assert evaluate("document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded')") == 'false'
    run('open', BASE + '/nuestroequipo/')
    run('snapshot', '-i')
    run('find', 'first', 'summary', 'click')
    assert evaluate("document.querySelector('details').open")
    # Inspect client-side errors after every checked route has run.
    errors = run('errors')
    assert not errors['data']['errors'], errors
    (OUTPUT / 'results.json').write_text(json.dumps(checks, indent=2) + '\n')
    print(f'Verified {len(checks)} page/viewport combinations, mobile menu and full biography controls.')
finally:
    run('close')
