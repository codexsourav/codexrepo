import { ICabBooking } from "../controller/BookingController.js";


export const isValidateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(String(email).toLowerCase());
};

export const isValidMobile = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
};

export const validateCabBooking = (data: ICabBooking): string | boolean => {
    // Validate required fields
    if (!data.tripInfo) {
        return 'Trip information is required';
    }

    if (!data.tripInfo.type) {
        return 'Trip type is required';
    }

    if (!data.tripInfo.from) {
        return 'From location is required';
    }

    if (data.type != "local" && !data.to) {
        return 'To location is required';
    }

    if (!data.tripInfo.pickupTime) {
        return 'Pickup time is required';
    }

    if (!data.tripInfo.pickupDate) {
        return 'Pickup date is required';
    }

    if (!data.orderId) {
        return 'Order ID is required';
    }

    if (!data.distance) {
        return 'Distance is required';
    }

    if (!data.landmark) {
        return 'Landmark is required';
    }

    if (!data.name) {
        return 'Name is required';
    }

    if (!data.email) {
        return 'Email is required';
    }

    if (!data.mobile) {
        return 'Mobile is required';
    }

    if (!data.amount) {
        return 'Amount is required';
    }

    if (!data.pickupTime) {
        return 'Pickup time is required';
    }

    if (!data.pickupDate) {
        return 'Pickup date is required';
    }

    if (!data.cabId) {
        return 'Cab ID is required';
    }

    if (!data.paymentType) {
        return 'Payment type is required';
    }

    // Add additional validations for specific fields if needed

    return true; // Validation passed
}
