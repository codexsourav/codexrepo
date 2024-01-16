import { Document, Model } from 'mongoose';

// Define the interface for the Cat document
interface IUsers {
    name: string;
    mobile: string | number;
    wallet: number;
    transaction: array;
    image: string;
    isAllow: boolean;
}

// Extend the Cat document with Document interface from Mongoose
interface IUsersDocument extends IUsers, Document { }

// Define the Cat model type
interface IUsersModel extends Model<IUsersDocument> { }

export { IUsers, IUsersDocument, IUsersModel };