const supertest = require("supertest")

const server = require("./server")
const db = require("../database/dbConfig")

let lambdaUser
const austinsUser = {
    username: 'austins',
    password: 'passs',
}

describe("server", () => {
    describe("environment", () => {
        it('should set the DB_ENV variable to "testing"', () => {
            expect(process.env.DB_ENV).toBe("testing")
        })
    })

    describe("Auth", () => {
        beforeAll(async () => {
            // trucate or empty the hobbits table
            await db("users").truncate()
        })

        describe('auth-router', () => {
            describe('post /register', () => {
                it("should return 201 when passed correct data", () => {
                    return supertest(server)
                        .post("/api/auth/register")
                        .send(austinsUser)
                        .then(res => {
                            expect(res.status).toBe(201)
                            lambdaUser = res.body
                            token = res.body.token
                        })
                })
                it('should return 400 when passed wrong data', () => {
                    return supertest(server)
                        .post("/api/auth/register")
                        .send({ username: 1, password: 1 })
                        .then(res => {
                            expect(res.status).toBe(404)
                        })
                })
            })

        })
        describe('post /login', () => {
            it("should return 201 when passed correct data", () => {
                // console.log(austinsUser.username)
                // console.log(austinsUser.password)
                return supertest(server)
                    .post("/api/auth/login")
                    .send(austinsUser)
                    .then(res => {
                        expect(res.status).toBe(200)
                    })
            })
            // it('should return 400 when Invalid credentials', () => {
            //     return supertest(server)
            //         .post("/api/auth/login")
            //         .send({ username: 1, password: 1 })
            //         .then(res => {
            //             expect(res.status).toBe(404)
            //         })
            // })
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
