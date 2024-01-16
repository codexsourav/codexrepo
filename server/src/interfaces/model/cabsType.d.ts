import { Document, Model } from 'mongoose';

// Define the interface for the Cat document
interface ICabs {
    image: string;
    name: string;
    carnumber: string;
    baserate: number;
    parkm: number;
    maxprc: number;
    isAllow: boolean;
    date: any,
}

// Extend the Cat document with Document interface from Mongoose
interface ICabsDocument extends ICabs, Document { }

// Define the Cat model type
interface ICabsModel extends Model<ICabsDocument> { }

export { ICabs, ICabsDocument, ICabsModel };