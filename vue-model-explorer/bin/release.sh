#!/usr/bin/env bash

set -euo pipefail # exit on any error, don't allow undefined variables, pipes don't swallow errors

# Get package name and version from package.json.
version=$(node -p "require('./package.json').version")
packageName=$(node -p "require('./package.json').name")

echo "Releasing version $version of $packageName..."

# Check that the current version hasn't been published.
publishedVersion=$(npm view "$packageName" version 2>/dev/null || echo "")
if [ "$publishedVersion" = "$version" ]; then
  echo "Error: Version $version is already published on NPM."
  exit 1
fi

# Create a git tag and push it to remote.
git tag -a "v$version" -m ""
git push origin "v$version"

# Build the Vue component using Vite.
pnpm build

# Publish the package to NPM.
npm publish --access public

echo "Release complete!"
