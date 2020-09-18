const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")


let token

describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })

    describe("Auth", () => {
        beforeEach(async () => {
            // trucate or empty the hobbits table
            await db("users").truncate()
        })
        
        describe('auth-router', () => {
            describe('post /register', () => {
                it("should return 201 when passed correct data", () => {
                    return supertest(server)
                        .post("/api/auth/register")
                        .send({ username: "lambda", password: 'testing123' })
                        .then(res => {
                            expect(res.status).toBe(201)
                            
                            token = res.body.token
                            console.log(token)
                        })
                })
                it()
            })
        })


    })

    // describe("Users GET /", () => {
    //     it("should return HTTP status code 200", () => {
    //         return supertest(server)
    //             .get("/")
    //             .then(res => {
    //                 expect(res.status).toBe(200)
    //             })
    //     })

    //     it("should return JSON", async () => {
    //         const res = await supertest(server).get("/")

    //         expect(res.type).toMatch(/json/i)
    //     })


    // })

})
