import express from 'express'
import {mongoDBURL, PORT} from './config.js'
import mongoose from 'mongoose'
import usersRoute from './routes/usersRoute.js'

const app = express()

app.use(express.json())
app.use('/users', usersRoute)

app.get('/', (request, response) => {
    return response.status(234).send('nigga')
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('database ok')
        app.listen(PORT, () => {
            console.log(`app is working on ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })