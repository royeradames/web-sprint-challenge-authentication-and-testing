const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })
    
    describe("POST /hobbits", () => {
        beforeEach(async () => {
            // trucate or empty the hobbits table
            await db("hobbits").truncate()
        })

        it("should return 201 when passed correct data", () => {
            return supertest(server)
                .post("/hobbits")
                .send({ name: "sam" })
                .then(res => {
                    expect(res.status).toBe(201)
                })
        })

        it("should fail with code 400 if passed incorrect data", () => {
            return supertest(server)
                .post("/hobbits")
                .send({})
                .then(res => {
                    expect(res.status).toBe(400)
                })
        })

        it("should insert the hobbit into the database", async () => {
            const res = await supertest(server).post("/hobbits").send({ name: "sam" })

            expect(res.body.data.name).toBe("sam")
        })

        it("should insert a collection of hobbits into the database", async () => {
            const data = [
                {
                    name: "sam",
                },
                {
                    name: "frodo",
                },
            ]

            await supertest(server).post("/hobbits").send(data)

            const hobbits = await db("hobbits")

            expect(hobbits).toHaveLength(2)
        })
    })

    describe("Users GET /", () => {
        it("should return HTTP status code 200", () => {
            return supertest(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it("should return JSON", async () => {
            const res = await supertest(server).get("/")

            expect(res.type).toMatch(/json/i)
        })

        
    })
    
})
