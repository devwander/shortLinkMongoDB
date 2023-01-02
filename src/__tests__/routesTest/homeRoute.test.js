const request = require('supertest')

const apiUrl = "http://localhost:8080"

describe("'/' router tests", () => {
    test("should return 200 and check json message", () => {
        try {
            request(apiUrl)
                .get('/')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
                .then(res => {
                    expect(res.body).toEqual({"message": "The api is on!"})
                })
        }
        catch (error) {
            console.error(error)
        }
    })
})