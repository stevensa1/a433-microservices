# Gunakan image NodeJS dengan versi 14
FROM node:14

# Atur directory untuk kerja atau WORKDIRECTORY ke path /app
WORKDIR /app

# Copy seluruh source code pada folder a433-microservices ke dalam container dalam directory /path
COPY . /app

# Atur environment variable untuk NodeJS
ENV NODE_ENV=production
ENV DB_HOST=item-db

# Install dependensi untuk produksi dan membangun atau build aplikasi
RUN npm install --production --unsafe-perm && npm run build

# Expose port 8080 untuk aplikasi dalam container
EXPOSE 8080

# Perintah yang akan dijalankan ketika container dijalankan untuk memulai aplikasi
CMD ["npm", "start"]