import { Request, Response } from "express";
import CabsModel from "../db/models/CabsMoadel.js";
import DestinationModel from "../db/models/destinationModule.js";
import { AuthRequest } from "../interfaces/AuthRequest.js";
import axios from "axios";
import { ITripPrice } from "../routes/booking.js";
import { validateCabBooking } from "../utils/validate.js";
import CabBookingModel from "../db/models/cabBooking.js";
import { generateRandomPaymentId } from "../utils/GenerateOTP.js";


export const initGetBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { type } = req.params;
        const { from, to, cabid, date, time, returndate, km } = req.body;
        var destinationData = null;
        if (!from || !cabid || !date || !time) {
            return res.send({ status: "INVALID_DATA", message: "invalid Data Received" });
        } else if (type != "local" && !to) {
            return res.send({ status: "INVALID_DATA", message: "invalid Data Received" });
        } else if (type == "local" && !km) {
            return res.send({ status: "INVALID_DATA", message: "invalid Data Received" });
        } else if (type == "airport" && !returndate) {
            return res.send({ status: "INVALID_DATA", message: "invalid Data Received" });
        }
        if (type != "local") {
            const searchDestinationData = await DestinationModel.findOne({ from, to });
            if (searchDestinationData) {
                destinationData = searchDestinationData;
            } else {
                // https://maps.googleapis.com/maps/api/distancematrix/json?origins=Sonagachhi,%20West%20Bengal,%20India&destinations=Malakarpota,%20West%20Bengal,%20India&mode=driving&language=en&key=AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40
                const mapsQuery = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&mode=driving&language=en&key=AIzaSyBicErnm5MQhQ9TEC8PHfQoBxQZEdv7v40`;
                const dstrencedata = await axios.post(mapsQuery);
                const destination = dstrencedata.data;
                const destinationDataGet = destination.rows[0].elements[0];
                destinationData = { from, to, "data": destinationDataGet }
                if (destinationDataGet.status == "OK") {
                    const newdestinationData = new DestinationModel({ from, to, data: destinationDataGet })
                    await newdestinationData.save();
                }
            }
        }
        const cab = await CabsModel.findOne({ _id: cabid });
        if (!cab) {
            return res.send({ status: "CAB_NOT_FOUND", message: "cab Not Found" });
        }
        const pricing: ITripPrice = {
            km: destinationData?.data.distance.text || km + "Km",
            value: type == "local" ? km : destinationData?.data.distance.value,
            price: type == "local" ? km * cab.parkm : ((destinationData?.data.distance.value || 0) / 1000) * cab.parkm,
        }

        res.send({ status: "OK", cab, destination: destinationData, user: req.authUser, pricing });

    } catch (error) {
        return res.send({ status: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
    }
}

export type ICabBooking = {
    tripInfo: {
        type: string;
        from: string;
        to?: string;
        trip?: string,
        pickupTime: string;
        pickupDate: string;
        returnDate?: string;
    };
    orderId: string;
    type: string;
    from: string;
    to?: string;
    trip?: string,
    distance: string;
    landmark: string;
    name: string;
    email: string;
    mobile: string;
    amount: number;
    pickupTime: string;
    pickupDate: string;
    returnDate?: string;
    cabId: string;
    paymentType: string;
}

export const newCabBooking = async (req: AuthRequest, res: Response) => {
    try {
        const data: ICabBooking = req.body;
        const validate = validateCabBooking(data);
        if (validate != true) {
            return res.send({ status: "INVALID_DATA", message: validate });
        }
        const bookingId = generateRandomPaymentId();
        const newBooking = new CabBookingModel({ ...data });
        await newBooking.save();
        return res.send({ status: "OK", message: "Booking Successful", orderId: data.orderId });
    } catch (error) {
        return res.send({ status: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
    }
}
