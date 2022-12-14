const express = require('express')
const app = express()
const port = 8080

const mongoConnection = require('./config/db/connect')
mongoConnection()

app.use(express.json())

const homeRoute = require('./routes/homeRoute')
const userRoute = require('./routes/userRoute')
const shortLinkRoute = require('./routes/shortLinkRoute')

app.use("/", homeRoute)
app.use("/users", userRoute)
app.use("/shortLinks", shortLinkRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})