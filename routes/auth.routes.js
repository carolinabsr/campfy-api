// import {Router} from 'express'
// import User from '../models/User.model.js'
// import bcrypt from 'bcryptjs'
// import 'dotenv/config'
// import jwt from 'jsonwebtoken'

// const authRouter = Router()

// authRouter.post('/auth/sign-up', async(req, res) => {
//     const payload = req.body

//     try{
//         const userExists = await User.findOne({email})
//         if(userExists) {
//             throw new Error('User already exists')
//         }

//         const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
//         const passwordHash = bcrypt.hashSync(password, salt)

//         const newUser = await User.create({payload, passwordHash})

//         return res.status(201).json({name: newUser.name, email: newUser.email})

//     } catch (error){
//         console.log(error)
//         return res.status(500).json({message:'Internal server error'})
//     }
// })

// export default authRouter