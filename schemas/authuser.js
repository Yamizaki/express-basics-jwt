import mongoose from "mongoose";

const AuthUserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim:true
        }
    }
);

export default mongoose.model('auth_users', AuthUserSchema, 'auth_users');