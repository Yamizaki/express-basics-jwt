import mongoose from 'mongoose';
import UserSchema from '../schemas/user.js';

class UserModel {
    async create(userData) {
        return await UserSchema.create(userData);
    }

    async findAll() {
        return await UserSchema.find();
    }

    async findById(id) {
        return await UserSchema.findById({_id: new mongoose.Types.ObjectId(id)});
    }

    async update(id, userData) {
        return await UserSchema.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)}, userData, { new: true });
    }

    async delete(id){
        return await UserSchema.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }
}

export default new UserModel();