const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../server');
require("dotenv").config;

const username = "testuser"
const today = new Date()
let distance = 100
let duration = 10

const exerciseToAdd = {
    username: username,
    exerciseType: "Running",
    description: " ",
    duration: duration,
    distance: distance,
    speed: distance * 60 / distance,
    pace: duration/distance,
    date: today
}

distance = 1.5
duration = 10

const exerciseToUpdate = {
    username: username,
    exerciseType: "Running",
    description: " ",
    duration: duration,
    distance: distance,
    speed: distance * 60 / distance,
    pace: duration / distance,
    date: today
}

let exerciseId = " "

afterAll(async () => {
    await server.close()
    await mongoose.connection.close()
});

describe("GET /exercises/", () => {
    it("should return all exercises", async () => {
        return request(app)
            .get("/exercises/")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    });
});

describe("POST /exercises/add", () => {
    test("should create a new exercise", async () => {
        return request(app)
            .post("/exercises/add")
            .send(exerciseToAdd)
            .expect(200)
            .then(({ body }) => {
                exerciseId = body.data._id
                expect(body.data.duration).toBe(exerciseToAdd.duration)
                expect(body.data.distance).toBe(exerciseToAdd.distance)
                expect(body.data.speed).toBe(exerciseToAdd.speed)
                expect(body.data.pace).toBe(exerciseToAdd.pace)
            })
    });
});

describe("GET /exercises/:id", () => {
    test("should get exercise for an id", async () => {
        return request(app)
            .get(`/exercises/${exerciseId}`)
            .expect(200)
            .expect('Content-Type', /json/)
    });
});

describe("PUT /exercises/update/:id", () => {
    test("should update an existing exercise", async () => {
        return request(app)
            .put(`/exercises/update/${exerciseId}`)
            .send(exerciseToUpdate)
            .expect(200)
            .then(({ body }) => {
                expect(body.exercise._id).toBe(exerciseId)
                expect(body.exercise.duration).toBe(exerciseToUpdate.duration)
                expect(body.exercise.distance).toBe(exerciseToUpdate.distance)
                expect(body.exercise.speed).toBe(exerciseToUpdate.speed)
                expect(body.exercise.pace).toBe(exerciseToUpdate.pace)
            })
    });
});

describe("DELETE /exercises/:id", () => {
    test("should delete an exercise for given id", async () => {
        return request(app)
            .delete(`/exercises/${exerciseId}`)
            .expect(200)
    });
});

