import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: false
        },
        is_admin: {
            type: Boolean,
            default: false
        }
    },
    {timestamps: true}
)

export default mongoose.model('users_data', userSchema, 'users_data');