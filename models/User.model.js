import mongoose from 'mongoose'
import validator from 'validator'

const {model, Schema} = mongoose

const userSchema = new Schema (

    {
        name: {
            type: String,
            required: true
        },
        
         surname: {
            type: String,
            required: true
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
        
        address: {
            type: String,
            required: true
        },
        
        passwordHash: {
            type: String, 
            required: true
        },
        
        profileImage: {
            type: String
        },
        
        commentary: [{
            type: Schema.Types.ObjectId,
            ref: "Commentary"
        }]
        
    }, {timestamps: true});
    
    export default model ("User", userSchema)

