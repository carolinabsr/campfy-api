import mongoose from 'mongoose'

const userSchema = new mongoose.Schema (

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
        
        endereço: {
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

