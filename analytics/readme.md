# Analytics service

This is the Analytics microservice for the MLA Fitness tracker app.

### Prerequisites

- Python
- Flask
- MongoDB


#### Running Flask application locally 

```sh
cd analytics
flask run -h localhost -p 5050
```

#### spin up MongoDB without docker-compose:
```
docker run --name mongodb -d -p 27017:27017 -v mongodbdata:/data/db mongo:latest
```

### Connect to MongoDB

```
mongosh -u root -p cfgmla23 --authenticationDatabase admin --host localhost --port 27017
```

show registered activities:
```
db.exercises.find()
```


## Deployment
The application is containerized using Docker and is configured for AWS deployment. A GitHub Actions pipeline is configured for CI/CD at [deploy-analytics](../.github/workflows/deploy-Analytics.yml) .