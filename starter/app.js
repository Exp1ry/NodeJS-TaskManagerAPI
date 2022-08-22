
const express = require('express')
const app = express()
SERVER_PORT = 4000
const connectDB = require('../db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

// Static dependencies
app.use(express.static('./public'))
const tasks = require('./routes/tasks')


// parse json (needed to get data from req.body)
app.use(express.json())

// middleware to import URL
app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandler)







const start = async () => {
    try{
await connectDB(process.env.MONGO_URI)
app.listen(SERVER_PORT, () => {
    console.log(`Listening to port ${SERVER_PORT}`);
})
    }
    catch(err){
return err
    }
}

start()

