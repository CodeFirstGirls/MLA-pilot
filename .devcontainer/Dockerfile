# Using Node.js base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18

# Install OpenJDK 8
RUN apt-get update && \
    apt-get install -y wget apt-transport-https gnupg software-properties-common && \
    wget -qO - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add - && \
    add-apt-repository --yes https://packages.adoptium.net/artifactory/deb/ && \
    apt-get update && \
    apt-get install -y temurin-8-jdk && \
    apt-get clean;


# Install git, Python, pip, Gradle
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install git python3 python3-pip gradle && apt-get clean

# Npm packages installation
RUN npm install -g cors axios express create-react-app

# Install Python requirements
RUN pip3 install Flask pymongo gunicorn python-dotenv Flask-PyMongo Flask-CORS

# Clean up
RUN rm -rf /var/lib/apt/lists/*


