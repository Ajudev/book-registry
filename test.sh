#!/usr/bin/env bash
set -e

docker-compose build
docker-compose up -d db

docker-compose run registry_app npm run test