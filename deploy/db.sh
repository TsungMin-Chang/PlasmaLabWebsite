#!/bin/sh
podman run -d --restart always --replace \
  --name plasmawebdb \
  -e POSTGRES_DB=plasma \
  -e POSTGRES_USER=plasma \
  -e POSTGRES_PASSWORD=harrypotterb09504007 \
  -e PGDATA=/var/lib/postgresql/data \
  -v plasmalabwebdb:/var/lib/postgresql/data \
  --net plasmaweb:ip=192.168.7.24 \
  postgres:16
