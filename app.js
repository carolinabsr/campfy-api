import dotenv from 'dotenv/config'
import express from 'express'
import connectDb from './config/db.connection.js'
import cors from 'cors'
// import authRouter from './routes/auth.routes.js'
import campsRoutes from './routes/camp.routes.js'


const app = express()
connectDb()

app.use(express.json())
app.use(cors())
app.use('/camps', campsRoutes)
// app.use(authRouter)

app.listen(process.env.PORT, () => console.log('Server listening on port: ', process.env.PORT))


