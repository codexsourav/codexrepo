import mongo, { Schema, model } from 'mongoose';
import { IAdminUsers } from 'src/interfaces/model/adminType.js';

const admin = new Schema<IAdminUsers>({
    name: {
        type: String,
        lowercase: false,
        minLength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 10,
        unique: true,
    },
    pass: {
        type: String,
    },
});

const AdminsModel = mongo.model("admin", admin);

export default AdminsModel;