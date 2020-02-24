#!/usr/bin/env bash

#np
VERSION=$(git describe --tags --abbrev=0)
echo "export const version = '${VERSION}';" > src/config.js
echo "export const released = '$(date)';" >> src/config.js
git add .
git ci -m "Version ${VERSION} pushed to app config"

