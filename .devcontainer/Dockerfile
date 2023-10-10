# Using Node.js base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install OpenJDK 8
RUN apt-get update && \
    apt-get install -y wget apt-transport-https gnupg && \
    wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | apt-key add - && \
    echo "deb https://adoptopenjdk.jfrog.io/adoptopenjdk/deb/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/adoptopenjdk.list && \
    apt-get update && \
    apt-get install -y adoptopenjdk-8-hotspot && \
    apt-get clean;

# Install git, Python, pip, Gradle
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git python3 python3-pip gradle && apt-get clean

# Npm packages installation
RUN npm install -g cors axios express create-react-app

# Install Flask using pip (optional if you need Python/Flask)
RUN pip3 install flask

# Clean up
RUN rm -rf /var/lib/apt/lists/*

