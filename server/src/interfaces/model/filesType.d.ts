import { Document, Model } from 'mongoose';

// Define the interface for the Cat document
interface IFiles {
    name: string;
    path: string;
    size: string | number;
    date: Date;
}

// Extend the Cat document with Document interface from Mongoose
interface IFilesDocument extends IFiles, Document { }

// Define the Cat model type
interface IFilesModel extends Model<IFilesDocument> { }

export { IFiles, IFilesDocument, IFilesModel };
