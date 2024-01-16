import mongo, { Schema, model } from 'mongoose';
import { IUsers } from 'src/interfaces/model/usersTypes.js';
import { hashPass } from '../../utils/HashPass.js';

const users = new Schema<IUsers>({
    name: {
        type: String,
        lowercase: false,
        minLength: 2,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        default: "profile.webp"
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 10,
        unique: true,
    },
    wallet: {
        type: Number,
        default: 0,
    },
    transaction: [
        {
            amount: Number,
            isIN: Boolean,
            message: String,
        }
    ],
    isAllow: {
        type: Boolean,
        required: true,
        default: true,
    },
});

const UsersModel = mongo.model("users", users);

export default UsersModel;