## Authentication service

This is the Authentication microservice for the MLA Fitness tracker app.

### Prerequisites

- Java 8
- MongoDB
- node
- npm 
- cucumber


#### Running Java application locally

```sh
cd authservice
./gradlew clean build
./gradlew bootRun
```

#### spin up MongoDB without docker-compose:
```
docker run --name mongodb -d -p 27017:27017 -v mongodbdata:/data/db mongo:latest
```

### Connect to MongoDB

```
mongosh -u root -p cfgmla23 --authenticationDatabase admin --host localhost --port 27017
```

show registered users:
```
db.users.find()
```

### Running Cucumber tests

```sh
cd authservice 

# check if node and npm are installed
node -v
npm -v

# install cucumber
npm install --save-dev @cucumber/cucumber

# run tests
npx cucumber-js

```

## Deployment
The application is containerized using Docker and is configured for AWS deployment. A GitHub Actions pipeline is configured for CI/CD at [deploy-authservice](../.github/workflows/deploy-AuthService.yml) .