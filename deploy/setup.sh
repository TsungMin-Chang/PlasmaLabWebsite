#!/bin/sh
## network
podman network create plasmaweb --subnet 192.168.7.24/28

## db
podman volume create plasmawebdb
