#!/usr/bin/env sh
DEFAULT_SCRIPT="src/js/test.js"

# If no arguments given, use the default script.
if [ "$#" -eq 0 ]; then
  script="$DEFAULT_SCRIPT"
else
  # If first arg looks like an option (starts with -), treat no script provided.
  if case "$1" in -*) true;; *) false;; esac; then
    script="$DEFAULT_SCRIPT"
  else
    # If first arg is an existing file or ends with .js, treat it as the script.
    if [ -f "$1" ] || case "$1" in *.js) true;; *) false;; esac; then
      script="$1"
      shift
    else
      # Otherwise treat first arg as an argument to the default script.
      script="$DEFAULT_SCRIPT"
    fi
  fi
fi

if ! command -v jjs >/dev/null 2>&1; then
  echo "Error: jjs no está en PATH"
  exit 2
fi

if [ "$#" -gt 0 ]; then
  jjs -cp .:classes:eif203.jar:lib/eif203.jar "$script" -- "$@"
else
  jjs -cp .:classes:eif203.jar:lib/eif203.jar "$script"
fi