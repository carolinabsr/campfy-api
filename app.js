import dotenv from 'dotenv/config'
import express from 'express'
import connectDb from './config/db.connection.js'
import cors from 'cors'


const app = express()
connectDb()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))


