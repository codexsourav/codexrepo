import express, { Response, Router, Request } from 'express';
import AdminsModel from '../db/models/AdminModels.js';
import CabsModel from '../db/models/CabsMoadel.js';
import admin_middleware from '../middleware/admin_middleware.js';
import { setJwtToken } from '../utils/makeTwtToken.js';
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
        const { image, name, baserate, carnumber, parkm, maxpac } = req.body;

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

        const newCab = new CabsModel({ image, name, baserate, carnumber, parkm, maxpac });

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
        const { image, name, baserate, carnumber, parkm, maxpac } = req.body;

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

        const updateCab = await CabsModel.updateOne({ _id: id }, { image, name, baserate, carnumber, parkm, maxpac });

        return res.status(200).json({ "message": "Cab Update Successfully" });

    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

AdminRouter.delete("/api/admin/cab/:id", admin_middleware, async (req: Request, res: Response) => {
    console.log("OKKK");

    try {
        const { id } = req.params;

        const deleteCab = await CabsModel.deleteOne({ _id: id });
        console.log(deleteCab);

        return res.status(200).json({ "message": "Cab Delete Successfully" });

    } catch (error) {
        console.log(error);

        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

export { AdminRouter };