import express from 'express'
import connectDb from './config/db.connection.js'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import campsRoutes from './routes/camp.routes.js'
import commentariesRoutes from './routes/commentary.routes.js'
import usersRoutes from './routes/users.routes.js'


const app = express()
connectDb()

app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000', process.env.REACT_URL]
}))

app.use('/camps', campsRoutes)
app.use('/commentary', commentariesRoutes)
app.use('/users', usersRoutes)
app.use(authRouter)

app.listen(process.env.PORT || 3001, () => console.log('Server listening on port: ', process.env.PORT || 3001))


