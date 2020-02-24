#!/usr/bin/env bash

#np
VERSION=$(git describe --tags --abbrev=0)
echo "export const version = '${VERSION}';" > src/config.js
echo "export const released = '$(date --iso-8601=seconds)';" >> src/config.js
echo "export const releaseLink = 'https://github.com/burkov/lfs-errors-dashboard/releases/tag/${VERSION}';" >> src/config.js
git add .
git ci -m "Version ${VERSION} pushed to app config"

