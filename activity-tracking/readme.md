# Actvity Tracking service

This is the Activity Tracking microservice for the MLA Fitness tracker app.

### Prerequisites

- Node.js
- MongoDB
- npm or yarn


#### Running Node.js Activity Tracker locally

```sh
cd activity-tracking
npm install
nodemon server
```

#### spin up MongoDB without docker-compose:
```
docker run --name mongodb -d -p 27017:27017 -v mongodbdata:/data/db mongo:latest
```

#### Populating database with test data

```sh
cd activity-tracking
npm install
node populatedb.js
```

### Connect to MongoDB

```
mongosh -u root -p cfgmla23 --authenticationDatabase admin --host localhost --port 27017
```

show registered activities:
```
db.exercises.find()
```

show weekly targets:
```
db.weeklytargets.find()
```

## Deployment
The application is containerized using Docker and is configured for AWS deployment. A GitHub Actions pipeline is configured for CI/CD at [deploy-activity-tracking](../.github/workflows/deploy-ActivityTracking.yml) .