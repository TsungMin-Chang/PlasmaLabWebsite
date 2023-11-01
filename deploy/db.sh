#!/bin/sh
podman run -d --restart always --replace \
  --name plasma-psqldb \
  -e POSTGRES_DB=plasma \
  -e POSTGRES_USER=plasma \
  -e POSTGRES_PASSWORD=harrypotterb09504007 \
  -e PGDATA=/var/lib/postgresql/data \
  -v plasma-psqldb:/var/lib/postgresql/data \
  --pod plasma-pod \
  postgres:16
