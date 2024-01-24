import { Request, Response } from "express";
import CabsModel from "../db/models/CabsMoadel.js";
import DestinationModel from "../db/models/destinationModule.js";
import { AuthRequest } from "../interfaces/AuthRequest.js";
import axios from "axios";
import { ITripPrice } from "../routes/booking.js";
import { validateCabBooking } from "../utils/validate.js";
import CabBookingModel from "../db/models/cabBooking.js";
import UsersModel from "../db/models/usersModels.js";


// ?type=oneway&pickupaddress=[]&dropaddress=[]&pickdate=[]&picktime=[];
// ?type=roundtrip&pickupaddress=[]&dropaddress=[]&pickdate=[]&returndate=[]&picktime=[];
// ?type=local&pickupaddress=[]&pickdate=[]&picktime=[];
// ?type=airport&trip=[]&airportname=[]&location=[]&pickdate=[]&picktime=[];

export const getCadData = async (find: any) => {
    let data = [];
    try {
        const bookings = await CabBookingModel.find(find).sort({ date: -1 });

        for (let i = 0; i < bookings.length; i++) {
            const element = bookings[i];
            const cab = await CabsModel.findOne({ _id: element.cabId });

            if (cab) {
                data.push({
                    ...element._doc,
                    cabInfo: cab
                })
            }

        }
        return data;
    } catch (error) {
        throw error
    }
}

export const getCadDataLimit = async ({ find, limit }: { find: any, limit: number }) => {
    let data = [];
    try {
        const bookings = await CabBookingModel.find(find).limit(limit).sort({ date: -1 });

        for (let i = 0; i < bookings.length; i++) {
            const element = bookings[i];
            const cab = await CabsModel.findOne({ _id: element.cabId });

            if (cab) {
                data.push({
                    ...element._doc,
                    cabInfo: cab
                })
            }

        }
        return data;
    } catch (error) {
        throw error
    }
}

export const initGetBooking = async (req: AuthRequest, res: Response) => {
    try {
        const { type } = req.params;
        const { from, to, cabid, date, time, returndate, km } = req.body;
        var destinationData = null;
        if (!from || !cabid || !date || !time) {
            return res.send({ status: "INVALID_DATA", message: "invalid Data Received" });
        } else if (type != "local" && !to) {
            return res.send({ status: "INVALID_DATA", message: "invalid To Location Received" });
        } else if (type == "local" && !km) {
            return res.send({ status: "INVALID_DATA", message: "invalid KM Received" });
        } else if (type == "roundtrip" && !returndate) {
            return res.send({ status: "INVALID_DATA", message: "Return Data Not Received" });
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
        const cab = await CabsModel.findOne({ _id: cabid, delete: false });
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
        console.log(error);

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
    paymentInfo: any,
}

export const newCabBooking = async (req: AuthRequest, res: Response) => {
    try {
        const user = req.authUser!;
        const data: ICabBooking = req.body;
        const validate = validateCabBooking(data);
        if (validate != true) {
            return res.send({ status: "INVALID_DATA", message: validate });
        }

        const newBooking = new CabBookingModel({ ...data, userId: user._id });
        await newBooking.save();

        if (!user.name) {
            UsersModel.updateOne({ _id: user._id }, { name: data.name, email: data.email }).then((e) => console.log(e));
        }

        return res.send({ status: "OK", message: "Booking Successful", orderId: data.orderId });
    } catch (error: any) {
        console.log(error);

        return res.send({ status: "INTERNAL_SERVER_ERROR", message: "Internal Server Error", error: error.toString() });
    }
}

export const mybooking = async (req: AuthRequest, res: Response) => {
    try {
        const bookingData = await getCadData({ userId: req.authUser!._id });
        const user = await UsersModel.findOne({ _id: req.authUser?._id }, { otp: 0 });

        res.send({ user, bookings: bookingData });
    } catch (error) {
        console.error("Error in mybooking:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const cancelOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { note } = req.body;
        if (!note) {
            return res.status(400).send({ message: "Write. why Cancel?" })
        }
        const newCab = await CabBookingModel.updateOne({ _id: id }, { $set: { status: "cancel", note, refund: false } });
        return res.status(200).json({ "message": "Booking Cancel Successfully" });
    } catch (error) {
        console.error("Error in mybooking:", error);
        res.status(500).send("Internal Server Error");
    }
};


export const deleteOrder = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const newCab = await CabBookingModel.updateOne({ _id: id }, { $set: { delete: true } });
        return res.status(200).json({ "message": "Booking Delete Successfully" });
    } catch (error) {
        console.error("Error in booking:", error);
        res.status(500).send("Internal Server Error");
    }
};