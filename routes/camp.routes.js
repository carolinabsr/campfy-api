import {Router} from 'express'
import Camp from '../models/Camp.model.js'
import isAuthenticatedMiddleware from '../middlewares/isAuthenticatedMiddleware.js'
import isAdmin from '../middlewares/isAdmin.js'


const campsRoutes = Router()

campsRoutes.get('/', [isAuthenticatedMiddleware, isAdmin], async (req, res) => {
    
    try {
        const camps = await Camp.find()
        return res.status(200).json(camps)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

campsRoutes.get('/:id', [isAuthenticatedMiddleware, isAdmin], async (req, res) => {
    
    const {id} = req.params

    try {
        const camp = await Camp.findById(id)

        if(!camp) {
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(camp)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

campsRoutes.post('/', [isAuthenticatedMiddleware, isAdmin], async (req, res) => {
    const payload = req.body

    try{
        const newCamp = await Camp.create(payload)
        return res.status(201).json(newCamp)
    } catch (error) {
        console.log(error)
        if(error.name === 'ValidationError'){
            return res.status(422).json({message: "Validation error. Check your inputs"})
        }
        return res.status(500).json({message:'Internal server error'})
    }
})

campsRoutes.put('/:id', [isAuthenticatedMiddleware, isAdmin], async (req, res) => {
    
    const {id} = req.params
    const payload = req.body

    try {
        const updatedCamp = await Camp.findOneAndUpdate({_id: id}, payload, {new: true})
        if(!updatedCamp){
            return res.status(404).json({message: 'Not Found'})
        }
        return res.status(200).json(updatedCamp)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal server error'})
    }
})

campsRoutes.delete('/:id', [isAuthenticatedMiddleware, isAdmin], async (req, res) => {
   
    const {id} = req.params

    try {

        const camp = await Camp.findById(id)

        if(!camp) {
            return res.status(404).json({message: 'Not Found'})
        }

        await Camp.findOneAndDelete({_id: id})
        return res.status(204).json()

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:'Internal server error'})
    }
})

export default campsRoutes