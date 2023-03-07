import {Router} from 'express'
import Commentary from '../models/Commentary.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'
import Camp from '../models/Camp.model.js'

const commentariesRoutes = Router()

commentariesRoutes.get('/', isAuthenticatedMiddleware, async (req, res) => {
    
    try {
        const commentaries = await Commentary.find()
        return res.status(200).json(commentaries)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

commentariesRoutes.get('/commentary/:id', isAuthenticatedMiddleware, async (req, res) => {
    
    const {id} = req.params

    try {
        const commentary = await Commentary.findById(id)

        if(!commentary) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(commentary)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

commentariesRoutes.post('/camps/:campId/commentary', isAuthenticatedMiddleware, async (req, res) => {

    const {campId} = req.params
    const payload = req.body

    try{
        const newCommentary = await Commentary.create({...payload, camp: campId, user: req.user.id})
        const camp = await Camp.findOneAndUpdate({_id: campId}, {$push: {commentary: newCommentary._id}})
        return res.status(201).json(newCommentary)
    } catch (error) {
        console.log(error)
        if(error.name === 'ValidationError'){
            return res.status(422).json({message: "Validation error. Check your inputs"})
        }
        return res.status(500).json({message:'Internal server error'})
    }
})

commentariesRoutes.put('/commentary/:id', isAuthenticatedMiddleware, async (req, res) => {
    
    const {id} = req.params
    const payload = req.body

    try {
        const updatedCommentary = await Commentary.findOneAndUpdate({_id: id}, payload, {new: true})
        if(!updatedCommentary){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(updatedCommentary)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

commentariesRoutes.delete('/commentary/:id', isAuthenticatedMiddleware, async (req, res) => {
   
    const {id} = req.params

    try {

        const commentary = await Commentary.findById(id)

        if(!commentary) {
            return res.status(404).json({message: 'Not Found'})
        }

        await Commentary.findOneAndDelete({_id: id})
        return res.status(204).json()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'})
    }
})

export default commentariesRoutes