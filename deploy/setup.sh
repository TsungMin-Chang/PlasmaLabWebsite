#!/bin/sh

## network
podman network create plasma-web \
  --subnet 192.168.7.24/28

## pod
podman pod create \
  --name plasma-pod \
  --network plasma-web \
  -p 192.168.0.109:1724:1724

## db
podman volume create plasma-psqldb
