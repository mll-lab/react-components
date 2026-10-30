import sys, json, os, gzip, re
# Prints, per route chunk, the JS and CSS a first page load needs: initial chunks plus the route chunk and its siblings.
label = sys.argv[1]
stats = json.load(open(f'/tmp/per-module-scripts/stats-{label}.json'))
build = f'/tmp/per-module-scripts/build-{label}'
chunks = {c['id']: c for c in stats['chunks']}
def file_sizes(cid):
    raw = gz = 0
    for f in chunks[cid]['files']:
        if not f.endswith('.js'): continue
        data = open(os.path.join(build, f), 'rb').read()
        raw += len(data); gz += len(gzip.compress(data, 6))
    return raw, gz
css = {}
for m in stats['modules']:
    if 'css-loader' in m['name'] and re.search(r'\.(css|less|scss)$', m['name']):
        lib = 'react-components' in m['name']
        for c in m.get('chunks', []):
            a = css.setdefault(c, [0, 0]); a[0] += m['size']; a[1] += m['size'] if lib else 0
initial = [c for c in chunks if chunks[c]['initial']]
def total(ids):
    raw = gz = cs = lib = 0
    for c in ids:
        r, g = file_sizes(c); raw += r; gz += g
        cs += css.get(c, [0, 0])[0]; lib += css.get(c, [0, 0])[1]
    return raw, gz, cs, lib
out = {'initial': total(initial)}
routes = [c for c in chunks if not chunks[c]['initial'] and any('routes.ts' in (o.get('moduleName') or '') for o in chunks[c]['origins'])]
for c in routes:
    group = {c} | {s for s in chunks[c].get('siblings', []) if s in chunks and not chunks[s]['initial']}
    out[c] = total(group)
json.dump(out, open(f'/tmp/per-module-scripts/route-load-{label}.json', 'w'))
print(label, 'routes', len(routes), 'initial', out['initial'])
