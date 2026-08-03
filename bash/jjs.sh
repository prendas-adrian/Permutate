#!/usr/bin/env sh
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <script.js> [args...]"
  exit 1
fi
if ! command -v jjs >/dev/null 2>&1; then
  echo "Error: jjs no está en PATH"
  exit 2
fi
script="$1"
shift
if [ "$#" -gt 0 ]; then
  jjs -cp .:classes:eif203.jar:lib/eif203.jar "$script" -- "$@"
else
  jjs -cp .:classes:eif203.jar:lib/eif203.jar "$script"
fi