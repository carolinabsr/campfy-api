import mongoose from 'mongoose'

const campSchema = new mongoose.Schema (
    
    {
        campName: {
            type: String,
            required: true
        },
        
        campImage: {
            type: [String],
            required: true
        },
        
        cidade: {
            type: String,
            required: true,
        },
        
         estado: {
            type: String,
            required: true,
        },
        
         país: {
            type: String,
            required: true,
        },
        
         endereço: {
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
        
         descrição: {
            type: String,
            required: true,
        },
        
         comodidades: {
            type: [String],
            required: true,
        }
        
    }, {timestamps: true});
    
    export default model ("Camp", campSchema)
    