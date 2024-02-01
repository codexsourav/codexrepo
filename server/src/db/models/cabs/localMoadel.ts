import mongoose, { Schema } from "mongoose";

const localCabsSchema = new Schema({
    carName: { type: String, required: true },
    price: {
        "40km": { type: Number, required: true },
        "4h": { type: Number, required: true },
        "80km": { type: Number, required: true },
        "8hr": { type: Number, required: true },
        "120km": { type: Number, required: true },
        "12hr": { type: Number, required: true },
        fullDay: { type: Number, required: true },
        "24hr": { type: Number, required: true },
    },
    discount: { type: Number, required: true },
    delete: { type: Boolean, default: false },
    maxPassengers: { type: Number, required: true },
    carImage: { type: String, required: true },
    tabs: {
        inclusionsAndExclusions: {
            fuel: {
                include: { type: Boolean, required: true },
                amount: { type: Number, required: true },
            },
            driverAllowance: { type: Boolean, required: true },
            nightAllowance: { type: Boolean, required: true },
            stateTaxToll: { type: Boolean, required: true },
            gst: {
                include: { type: Boolean, required: true },
                percent: { type: Number, required: true },
            },
            payAfterKm: {
                include: { type: Boolean, required: true },
                amount: { type: Number, required: true },
            },
            parking: { type: Boolean, required: true },
        },
        facilities: {
            seat: { type: Number, required: true },
            bags: { type: Number, required: true },
            ac: { type: Boolean, required: true },
        },
        termsAndConditions: { type: [String], required: true },
    },
});

const LocalCabsModel = mongoose.model('LocalCabs', localCabsSchema);

export default LocalCabsModel;