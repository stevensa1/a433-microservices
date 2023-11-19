#!/bin/bash

# Perintah untuk membuat Docker image dari Dockerfile yang tadi dibuat, dengan nama image item-app, dan memiliki tag v1.
docker build -t item-app:v1 .

# Melihat daftar image di lokal.
docker images

# Mengubah nama image agar sesuai dengan format Docker Hub (atau GitHub Packages bila menerapkan saran keempat).
docker tag item-app:v1 ghcr.io/stevensa1/item-app:v1

# Login ke Docker Hub (atau GitHub Packages bila menerapkan saran keempat) via Terminal.
echo $CR_PAT | docker login ghcr.io -u USERNAME --password-stdin

# Mengunggah image ke Docker Hub (atau GitHub Packages bila menerapkan saran keempat).
docker push ghcr.io/stevensa1/item-app:v1