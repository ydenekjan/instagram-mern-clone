import express from 'express'
import {dbUrl, PORT} from './config.js'
import mongoose from 'mongoose'
import usersRoute from './routes/usersRoute.js'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({origin: true}))


app.use('/users', usersRoute)

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log('database ok')
        app.listen(PORT, () => {
            console.log(`app is working on ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })