import mongoose from 'mongoose'
import validator from 'validator'

const {model, Schema} = mongoose

const campSchema = new Schema (
    
    {
        campName: {
            type: String,
            required: true
        },
        
        campImage: {
            type: [String],
            required: true
        },
        
        city: {
            type: String,
            required: true,
        },
        
         state: {
            type: String,
            required: true,
        },
        
         country: {
            type: String,
            required: true,
        },
        
         address: {
            type: String,
            required: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate: {
                validator: (value) => validator.isEmail(value),
                message: "Este campo precisar ser um email válido"
            }
        },
        
         description: {
            type: String,
            required: true,
        },
        
         convenience: {
            type: [String],
            required: true,
        }
        
    }, {timestamps: true});
    
    export default model ("Camp", campSchema)
    