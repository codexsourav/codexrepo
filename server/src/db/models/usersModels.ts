import mongo, { Schema, model } from 'mongoose';
import { IUsers } from 'src/interfaces/model/usersTypes.js';
import { hashPass } from '../../utils/HashPass.js';

const users = new Schema<IUsers>({
    name: {
        type: String,
        required: true,
        lowercase: false,
        minLength: 2,
        trim: true,
    },
    image: {
        type: String,
        required: true,
        default: "profile.webp"
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 2,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minLength: 10,
        unique: true,
    },
    pass: {
        type: String,
        required: true,
    },
    isAllow: {
        type: Boolean,
        required: true,
        default: true,
    },
});

users.pre("save", function (next) {
    if (!this.isModified("pass")) {
        var hash = hashPass(this.pass);
        this.pass = hash;
        next();
    }

    this.pass = hashPass(this.pass);
    next();
});


const UsersModel = mongo.model("users", users);

export default UsersModel;