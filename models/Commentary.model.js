import mongoose from 'mongoose'

const {model, Schema} = mongoose

const commentarySchema = new Schema (
    
    {
        commentary: {
            type: String,
            required: true
        },
        
        rating: {
            type: Number,
            required: true,
            min: 1,
            max:5
        },
        
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        
        camp: {
            type: Schema.Types.ObjectId,
            ref: "Camp"
        }
        
        
        
    }, {timestamps: true});
    
    export default model ("Commentary", commentarySchema)