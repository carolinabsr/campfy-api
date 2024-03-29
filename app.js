import express from 'express'
import connectDb from './config/db.connection.js'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import campsRoutes from './routes/camp.routes.js'
import commentariesRoutes from './routes/commentary.routes.js'
import usersRoutes from './routes/users.routes.js'


const app = express()
connectDb()

app.use(cors())
// app.options("*", cors())
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     app.use(cors());
//     next();
// })

// app.use(cors({
//     origin: ['http://localhost:3000', process.env.REACT_URL]
// }))

app.use(express.json())

app.use('/camps', campsRoutes)
app.use('/users', usersRoutes)
app.use(commentariesRoutes)
app.use(authRouter)

app.listen(process.env.PORT || 3001, () => console.log('Server listening on port: ', process.env.PORT || 3001))


