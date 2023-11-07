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

# Install mongosh
RUN wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/7.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && sudo apt-get update \
    && sudo apt-get install -y mongodb-mongosh mongodb-org-server \
    && sudo apt-get clean

# Clean up
RUN rm -rf /var/lib/apt/lists/*


