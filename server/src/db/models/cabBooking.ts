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
    isComplete: boolean;
    paymentType: string;
    isAccepted: boolean;
    paymentInfo: object;
    driverInfo: DriverInfo;
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
    isComplete: { type: Boolean, required: true, default: false },
    paymentType: { type: String, required: true },
    paymentInfo: Object,
    isAccepted: { type: Boolean, required: true, default: false },
    driverInfo: { type: driverInfoSchema },
});

const CabBookingModel = model<CabBooking>('CabBooking', cabBookingSchema);

export default CabBookingModel;
