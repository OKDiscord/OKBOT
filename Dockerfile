# Images
FROM node:12.18.3-stretch

# Maintainer
LABEL maintainer OKDiscord

# Bot folder
RUN mkdir -p /usr/src/okbot
WORKDIR /usr/src/okbot

# Bot files
COPY . /usr/src/okbot

# System dependencies
RUN apt update && apt upgrade -y && apt install git python -y

# Yarn dependencies
RUN yarn
