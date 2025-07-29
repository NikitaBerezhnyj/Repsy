FROM node:22.15.0

RUN npm install -g expo-cli eas-cli @expo/ngrok

RUN apt-get update && apt-get install -y \
    watchman \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 19000 19001 19002