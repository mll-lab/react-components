#!/bin/bash
set -Eeuo pipefail
# Tag-like production build of the Limes worktree with Rspack stats written to /tmp/per-module-scripts/stats-<label>.json.
cd "$1"
docker compose run --rm -e WEBPACK_INCLUDE_SOURCE_MAPS=true -e NODE_ENV=production -e WEBPACK_INCLUDE_BUNDLE_ANALYZER=true limes-frontend-web \
  sh -c 'rm -rf build && yarn rspack build --config=internals/rspack/rspack.prod.ts --json=stats.json' > "/tmp/per-module-scripts/limes-build-$2.log" 2>&1
[ -f build/stats.json ] && [ "$(ls build | wc -l)" -gt 1 ] || { jq -r ".errors[:3][].message" stats.json; exit 1; }
mv build/stats.json "/tmp/per-module-scripts/stats-$2.json"; rm -f stats.json
rm -rf "/tmp/per-module-scripts/build-$2" && cp -r build "/tmp/per-module-scripts/build-$2"
