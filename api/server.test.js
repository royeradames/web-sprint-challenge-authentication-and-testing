const supertest = require("supertest")

const server = require("./server.js")
const db = require("../data/dbConfig.js")

describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })
    
    describe("POST /hobbits", () => {
        beforeEach(async () => {
            // trucate or empty the hobbits table
            await db("users").truncate()
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
