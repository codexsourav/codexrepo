import express from 'express';
import DestinationModel from '../db/models/destinationModule.js';
import middleware from '../middleware/middleware.js';
import { initGetBooking, newCabBooking } from '../controller/BookingController.js';

const BookingRoutes = express.Router();
export interface ITripPrice {
    km: string | undefined; // Assuming destinationData?.data.distance.text is of type string
    value: number | string | undefined; // Assuming destinationData?.data.distance.value is of type number
    price: number;
}

// ["oneway","airport","local","roundtrip"]
BookingRoutes.post("/api/booking/:type", middleware, initGetBooking)
BookingRoutes.post("/api/new/booking/", middleware, newCabBooking)


export { BookingRoutes };