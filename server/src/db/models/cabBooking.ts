import { Document, Schema, model } from 'mongoose';

export interface TripInfo {
    type: string;
    from: string;
    to: string;
    trip: string,
    pickupTime: string;
    pickupDate: string;
    returnDate: string;
}

export interface DriverInfo {
    name: string;
    mobile: string;
    carNo: string;
}

export interface CabBooking extends Document {
    _doc: any,
    tripInfo: TripInfo;
    userId: string,
    orderId: string;
    type: string;
    from: string;
    to: string;
    trip: string,
    distance: string;
    landmark: string;
    name: string;
    email: string;
    mobile: string;
    amount: number;
    pickupTime: string;
    pickupDate: string;
    returnDate: string;
    cabId: string;
    paymentType: string;
    status: string;
    paymentInfo: object;
    driverInfo: DriverInfo;
    refund: boolean;
    cabData: any,
    note: string,
    delete: boolean,
    date: Date,
}

const tripInfoSchema = new Schema<TripInfo>({
    type: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String },
    trip: { type: String },
    pickupTime: { type: String, required: true },
    pickupDate: { type: String, required: true },
    returnDate: { type: String },
});

const driverInfoSchema = new Schema<DriverInfo>({
    name: { type: String },
    mobile: { type: String },
    carNo: { type: String },
});

export const cabBookingSchema = new Schema<CabBooking>({
    tripInfo: { type: tripInfoSchema },
    userId: { type: String, required: true },
    orderId: { type: String, required: true },
    type: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String },
    trip: { type: String },
    distance: { type: String, required: true },
    landmark: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    amount: { type: Number, required: true },
    pickupTime: { type: String, required: true },
    pickupDate: { type: String, required: true },
    returnDate: { type: String },
    cabId: { type: String, required: true },
    paymentType: { type: String, required: true },
    refund: { type: Boolean },
    paymentInfo: Object,
    driverInfo: { type: driverInfoSchema },
    status: { type: String, default: "pending", required: true },
    note: { type: String },
    delete: { type: Boolean, default: false, required: true },
    date: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

const CabBookingModel = model<CabBooking>('CabBooking', cabBookingSchema);

export default CabBookingModel;
