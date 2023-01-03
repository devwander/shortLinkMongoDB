const express = require('express')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')
require('dotenv').config()

const app = express()
const port = process.env.PORT

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

const mongoConnection = require('./config/db/connect')
mongoConnection()

app.use(express.json())
app.use(bodyParser.json())

const homeRoute = require('./routes/homeRoute')
const userRoute = require('./routes/userRoute')
const shortLinkRoute = require('./routes/shortLinkRoute')
const loginRoute = require('./routes/loginRoute')

app.use("/", homeRoute)
app.use("/users", userRoute)
app.use("/shortLinks", shortLinkRoute)
app.use("/login", loginRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})