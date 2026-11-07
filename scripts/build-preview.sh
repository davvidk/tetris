#!/usr/bin/env bash
set -euo pipefail

# Run from any directory; publish only the standalone game.
project_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$project_root"
mkdir -p dist
cp index.html dist/index.html
cp .nojekyll dist/.nojekyll
cmp index.html dist/index.html
printf 'Cloudflare Pages output prepared in dist/\n'
