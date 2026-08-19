#!/usr/bin/env bash
# Commit and push V&Mi Nail Spa.
#   bash push.sh                 -> uses the default message
#   bash push.sh "your message"  -> uses your message
set -euo pipefail

cd "$(dirname "$0")"

MSG="${1:-Add about, gallery, testimonials and closing CTA; full-bleed hero}"

# Clear any stale lock. Harmless if absent — this is just an empty marker file
# that git leaves behind when a write is interrupted.
rm -f .git/index.lock

if [ ! -d .git ]; then
  echo "No git repo here. Initialising…"
  git init -b main
  git remote add origin https://github.com/vienhong20/Vnmi_Nail_Spa.git
fi

git add -A

if git diff --cached --quiet; then
  echo "Nothing to commit — working tree already matches the last commit."
  exit 0
fi

echo
echo "About to commit:"
git diff --cached --stat | tail -n 20
echo

git commit -m "$MSG"
git push -u origin main

echo
echo "Pushed. https://github.com/vienhong20/Vnmi_Nail_Spa"
