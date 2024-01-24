import exp from "constants";

export interface TripInfo {
    type: string;
    from: string;
    to: string | null;
    trip: string | null;
    pickupTime: string;
    pickupDate: string;
    returnDate: string | null;
    _id: string;
}

export interface CabInfo {
    _id: string;
    name: string;
    baserate: number;
    carnumber: string;
    image: string;
    parkm: number;
    maxpac: number;
    delete: boolean;
    isAllow: boolean;
    date: string;
    __v: number;
}

export interface Booking {
    _id: string;
    tripInfo: TripInfo;
    userId: string;
    orderId: string;
    type: string | null;
    from: string;
    to: string | null;
    trip: string | null;
    distance: string;
    landmark: string;
    name: string;
    email: string;
    mobile: string;
    amount: number;
    pickupTime: string;
    pickupDate: string;
    returnDate: string | null;
    cabId: string;
    isComplete: boolean;
    paymentType: string;
    isAccepted: boolean;
    date: string;
    __v: number;
    cabInfo: CabInfo;
    note: string,
    status: string,
    driverInfo: any,
    paymentInfo: any,
    refund: boolean,
}

export interface User {
    _id: string | null;
    image: string;
    email: string | null;
    mobile: string;
    wallet: number;
    isAllow: boolean;
    transaction: any[]; // Update the type based on the actual structure of the transaction array
    __v: number;
    name: string | null;
    date: string,
}

export interface MyBookingResponse {
    user: User;
    bookings: Booking[];
}
