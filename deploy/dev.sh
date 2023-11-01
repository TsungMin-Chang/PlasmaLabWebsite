#!/bin/sh
baseDir="$(realpath "$(dirname $0)/../backend")"

## backend
mkdir -p "$baseDir"/../deploy/mnt
podman run -d --replace \
  --name plasma-backend \
  -v plasma-backend-sock:/var/run/plasma \
  -v "$baseDir":/app \
  -v "$baseDir"/../deploy/mnt:/mnt/res \
  -v "$baseDir"/../frontend/public:/mnt/public \
  -v "$baseDir"/../frontend/dist:/mnt/dist \
  -w /app \
  --pod plasma-pod \
  node:18.18.2-alpine3.18 \
  yarn deploy
