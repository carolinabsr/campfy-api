import {Router} from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import User from '../models/User.model.js'


const authRouter = Router()

authRouter.post('/sign-up', async(req, res) => {
    const {name, surname, address, email, password} = req.body

    try {
        
        const userExists = await User.findOne({email})
        if(userExists) {
            throw new Error('User already exists')
        }

        const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = await User.create({name, surname, address, email, passwordHash})
        if(newUser) {
            return res.status(201).json({messsage: 'User Created'})
        }


    } catch (error){
        console.log(error)
        if(error.message === 'User already exists'){
            return res.status(409).json({message:'Check your inputs'})
        }

        return res.status(500).json({message:'Internal server error'})
    }
})

export default authRouter