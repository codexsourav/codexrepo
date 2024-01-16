import { Document, Model } from 'mongoose';

// Define the interface for the Cat document
interface IAdminUsers {
    name: string;
    email: string | number;
    pass: string;
}

// Extend the Cat document with Document interface from Mongoose
interface IAdminUsersDocument extends IAdminUsers, Document { }

// Define the Cat model type
interface IAdminUsersModel extends Model<IAdminUsersDocument> { }

export { IAdminUsers, IAdminUsersDocument, IAdminUsersModel };