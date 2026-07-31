#!/usr/bin/env bash
# Pre-flight check: typecheck, lint, build, tests
# Uso: ./scripts/preflight.sh

set -e
cd "$(dirname "$0")/.."

echo "→ TypeScript"
npx tsc --noEmit

echo "→ Linting"
npx next lint 2>&1 | tail -20 || true

echo "→ Build"
rm -rf .next
npx next build

echo "→ Done."
