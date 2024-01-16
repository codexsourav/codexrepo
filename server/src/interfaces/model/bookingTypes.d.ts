import { Document, Model } from 'mongoose';

// Define the interface for the Cat document
interface IBooking {
    userId: string,
    bookingId: string,
    trip: {
        pickup: string,
        drop: string,
        type: string,
        car: string,
        date: string,
        time: string,
        price: number,
        distance: number,
    },
    contactInfo: {
        name: string,
        email: string,
        mobile: number,
        pickup: string,
        pickupLine: string,
        drop: string,
    },
    driverInfo: {
        contact: string,
        name: string,
        carNumber: string,
    }
    date: Date,
}

// Extend the Cat document with Document interface from Mongoose
interface IBookingDocument extends IBooking, Document { }

// Define the Cat model type
interface IBookingModel extends Model<IBookingDocument> { }

export { IBooking, IBookingDocument, IBookingModel };