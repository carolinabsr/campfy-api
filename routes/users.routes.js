import {Router} from 'express'
import 'dotenv/config'
import User from '../models/User.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'


const usersRoutes = Router()

usersRoutes.get('/', isAuthenticatedMiddleware, async (req, res) => {
    
    try {
        const users = await User.find()
        return res.status(200).json(users)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

usersRoutes.get('/:id', isAuthenticatedMiddleware, async (req, res) => {
    
    const {id} = req.params

    try {
        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

usersRoutes.put('/:id', isAuthenticatedMiddleware, async (req, res) => {
    
    const {id} = req.params
    const payload = req.body

    try {
        const updatedUser = await User.findOneAndUpdate({_id: id}, payload, {new: true})
        if(!updatedUser){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(updatedUser)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

usersRoutes.delete('/:id', isAuthenticatedMiddleware, async (req, res) => {
   
    const {id} = req.params

    try {

        const user = await User.findById(id)

        if(!user) {
            return res.status(404).json({message: 'Not Found'})
        }

        await User.findOneAndDelete({_id: id})
        return res.status(204).json()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'})
    }
})


export default usersRoutes