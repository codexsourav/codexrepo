import express, { Response, Router, Request } from 'express';
import AdminsModel from '../db/models/AdminModels.js';
import CabsModel from '../db/models/CabsMoadel.js';
import admin_middleware from '../middleware/admin_middleware.js';
import { setJwtToken } from '../utils/makeTwtToken.js';
import { AuthRequest } from '../interfaces/AuthRequest.js';
import UsersModel from '../db/models/usersModels.js';
import CabBookingModel from '../db/models/cabBooking.js';
import { getCadData, getCadDataLimit } from '../controller/BookingController.js';
const AdminRouter = express.Router();

AdminRouter.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
        const { email, pass } = req.body;
        console.log(req.body.email);

        if (!email || !pass) {
            return res.status(203).json({ "message": "Invalid Email Or Password" });
        }
        const user = await AdminsModel.findOne({ email, pass });
        console.log(user);

        if (!user) {
            return res.status(203).json({ "message": "Invalid Email Or Password" });
        } else {
            const token = setJwtToken({ "email": user?.email, "_id": user?._id })
            return res.status(200).json({ "message": "Login Successful", token });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.post("/api/admin/home", async (req: AuthRequest, res: Response) => {
    try {
        const users = await UsersModel.find({});
        const bookings = await CabBookingModel.find({ isComplete: false });
        const data = await getCadDataLimit({ find: { status: "pending" }, limit: 20 });

        res.send({ users: users.length, bookings: bookings.length, data });
    } catch (error) {
        res.send({ users: 0, bookings: 0, data: [] });
    }
});

AdminRouter.post("/api/admin/home/users", async (req: AuthRequest, res: Response) => {
    try {
        let data: any[] = [];
        const users = await UsersModel.find({}, { otp: 0 });
        for (let i = 0; i < users.length; i++) {
            const element = users[i];
            const book = await CabBookingModel.find({ userId: element._id });
            data.push({ user: element, totalBook: book.length })
        }
        res.send(data);
    } catch (error) {
        res.send([]);
    }
});

AdminRouter.get("/api/cabs", async (req: Request, res: Response) => {
    try {
        const cabs = await CabsModel.find({ delete: false });
        return res.status(200).json(cabs);

    } catch (error) {
        console.log(error);
        return res.status(500).json([]);
    }
});

AdminRouter.post("/api/admin/addcab", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { image, name, baserate, carnumber, parkm, maxpac, discount, allowTrip } = req.body;

        if (!image) {
            return res.status(203).json({ "message": "Please Select Car Image" });
        }

        if (!name) {
            return res.status(203).json({ "message": "Name is required" });
        }

        if (!baserate) {
            return res.status(203).json({ "message": "Enter The Base Rate" });
        }

        if (!carnumber) {
            return res.status(203).json({ "message": "Car Number is required" });
        }

        if (!parkm) {
            return res.status(203).json({ "message": "Enter 1/Kilometer Price" });
        }

        if (!maxpac) {
            return res.status(203).json({ "message": "Enter Max Passenger Capacity" });
        }
        if (!allowTrip || allowTrip.length == 0) {
            return res.status(203).json({ "message": "Select Allow Trips On This Cab" });
        }
        if (!discount) {
            return res.status(203).json({ "message": "Please Enter A discount min 0" });
        }
        const newCab = new CabsModel({ image, name, baserate, carnumber, parkm, maxpac, allowTrip, discount });

        await newCab.save();
        return res.status(200).json({ "message": "New Cab Added Successfully" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.put("/api/admin/cab/:id", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { image, name, baserate, carnumber, parkm, maxpac, allowTrip, discount } = req.body;

        if (!image) {
            return res.status(203).json({ "message": "Please Select Car Image" });
        }

        if (!name) {
            return res.status(203).json({ "message": "Name is required" });
        }

        if (!baserate) {
            return res.status(203).json({ "message": "Enter The Base Rate" });
        }

        if (!carnumber) {
            return res.status(203).json({ "message": "Car Number is required" });
        }

        if (!parkm) {
            return res.status(203).json({ "message": "Enter 1/Kilometer Price" });
        }

        if (!maxpac) {
            return res.status(203).json({ "message": "Enter Max Passenger Capacity" });
        }
        if (!allowTrip || allowTrip.length == 0) {
            return res.status(203).json({ "message": "Select Allow Trips On This Cab" });
        }
        if (!discount) {
            return res.status(203).json({ "message": "Please Enter A discount min 0" });
        }
        const updateCab = await CabsModel.updateOne({ _id: id }, { image, name, baserate, carnumber, parkm, maxpac, allowTrip, discount });

        return res.status(200).json({ "message": "Cab Update Successfully" });

    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.delete("/api/admin/cab/:id", admin_middleware, async (req: Request, res: Response) => {
    console.log("OKKK");

    try {
        const { id } = req.params;

        const deleteCab = await CabsModel.updateOne({ _id: id }, { $set: { delete: true } });
        console.log(deleteCab);

        return res.status(200).json({ "message": "Cab Delete Successfully" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.delete("/api/admin/removeuser/:id", admin_middleware, async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        await UsersModel.deleteOne({ _id: id });
        return res.status(200).json({ "message": "User Delete Successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});


AdminRouter.post("/api/admin/bookingstatus/:status/:id", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { name, carnumber, mobile, note, cashback, refund } = req.body;
        const { id, status } = req.params;

        if (status == "accepted") {
            if (!name) {
                return res.status(203).json({ "message": "Driver Name is required" });
            }

            if (!carnumber) {
                return res.status(203).json({ "message": "Car Number is required" });
            }

            if (!mobile) {
                return res.status(203).json({ "message": "Enter Driver Mobile Number" });
            }
            const newCab = await CabBookingModel.updateOne({ _id: id }, { $set: { status, driverInfo: { name, carNo: carnumber, mobile } } });
            return res.status(200).json({ "message": "Booking " + status + " Successfully" });
        } else if (status == "cancel") {

            const newCab = await CabBookingModel.updateOne({ _id: id }, { $set: { status, note, refund: refund } });
            return res.status(200).json({ "message": "Booking " + status + " Successfully" });
        } else if (status == "complete") {
            if (!cashback) {
                return res.status(203).json({ "message": "Enter Cashback Amount" });
            }

            const newCab = await CabBookingModel.findOneAndUpdate({ _id: id }, { $set: { status, note } });
            const user = await UsersModel.findOne({ _id: newCab?.userId });
            await UsersModel.updateOne({ _id: user?._id }, { $set: { wallet: user?.wallet + cashback } });
            return res.status(200).json({ "message": "Booking " + status + " Successfully" });
        } else {
            const newCab = await CabBookingModel.updateOne({ _id: id }, { $set: { status, note, refund: refund } });
            return res.status(200).json({ "message": "Booking " + status + " Successfully" });
        }


    } catch (error) {
        console.log(error);

        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.get("/api/bookings/refunds", async (req: Request, res: Response) => {
    try {
        const data = await getCadData({ status: "cancel", refund: false, paymentType: "prepaid" });
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json([]);
    }
});


AdminRouter.get("/api/bookings/:status", async (req: Request, res: Response) => {
    try {
        const { id, status } = req.params;
        const data = await getCadData({ status });
        return res.status(200).json(data);

    } catch (error) {
        console.log(error);
        return res.status(500).json([]);
    }
});

AdminRouter.post("/api/bookings/refund/mark/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await CabBookingModel.findOneAndUpdate({ _id: id }, { $set: { refund: true } });
        return res.status(200).json({ message: "Payment Accepted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Payment Accepted Error" });
    }
});


export { AdminRouter };