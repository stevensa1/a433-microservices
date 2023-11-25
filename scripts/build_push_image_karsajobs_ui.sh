#!/bin/bash

# Perintah untuk membuat Docker image dari Dockerfile dengan nama karsajobs dan tag latest
docker build -t ghcr.io/stevensa1/karsajobs-ui:latest .

# Login ke Docker Hub (atau GitHub Packages bila menerapkan saran keempat) via Terminal.
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Mengunggah image ke Docker Hub (atau GitHub Packages bila menerapkan saran keempat).
docker push ghcr.io/stevensa1/karsajobs-ui:latest