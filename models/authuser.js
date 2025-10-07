import mongoose from 'mongoose';
import AuthUserSchema from '../schemas/authuser.js';
import bcrypt from 'bcrypt';
class AuthUserModel {
    async create(AuthUserData) {
        return await AuthUserSchema.create(AuthUserData);
    }

    async findAll() {
        return await AuthUserSchema.find();
    }

    async findById(id) {
        return await AuthUserSchema.findById({_id: new mongoose.Types.ObjectId(id)});
    }

    async findOne(query) {
        return await AuthUserSchema.findOne(query);
    }

    async update(id, AuthUserData) {
        return await AuthUserSchema.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(id)}, AuthUserData, { new: true });
    }

    async delete(id){
        return await AuthUserSchema.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)});
    }

    async hashPassword(params) {
        return await bcrypt.hash(params, 10);
    }

    async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default new AuthUserModel();