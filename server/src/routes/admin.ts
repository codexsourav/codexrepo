import { Response, Router, Request } from 'express';
import AdminsModel from 'src/db/models/AdminModels.js';
import CabsModel from 'src/db/models/CabsMoadel.js';
import admin_middleware from 'src/middleware/admin_middleware.js';
import { setJwtToken } from 'src/utils/makeTwtToken.js';
const router: Router = Router();

router.post("/api/admin/login", async (req: Request, res: Response) => {
    try {
        const { email, pass } = req.body;
        if (!email || !pass) {
            return res.status(203).json({ "message": "Invalid Email Or Password" });
        }
        const user = await AdminsModel.find({ email, pass });
        if (!user) {
            return res.status(203).json({ "message": "Invalid Email Or Password" });
        } else {
            const token = setJwtToken(req, user)
            return res.status(200).json({ "message": "Login Successful", token });
        }
    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

router.post("/api/admin/addcab", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { image, name, baserate, carnumber, kmprice, maxpac } = req.body;

        if (!image) {
            return res.status(203).json({ "message": "Please Select Car Image" });
        }

        if (!name) {
            return res.status(203).json({ "message": "Name is required" });
        }

        if (!baserate || isNaN(baserate)) {
            return res.status(203).json({ "message": "Enter The Base Rate" });
        }

        if (!carnumber) {
            return res.status(203).json({ "message": "Car Number is required" });
        }

        if (!kmprice || isNaN(kmprice)) {
            return res.status(203).json({ "message": "Enter 1/Kilometer Price" });
        }

        if (!maxpac || isNaN(maxpac)) {
            return res.status(203).json({ "message": "Enter Max Passenger Capacity" });
        }

        const newCab = new CabsModel({ image, name, baserate, carnumber, kmprice, maxpac });

        await newCab.save();
        return res.status(200).json({ "message": "New Cab Added Successfully" });

    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

router.put("/api/admin/cab/:id", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { image, name, baserate, carnumber, kmprice, maxpac } = req.body;

        if (!image) {
            return res.status(203).json({ "message": "Please Select Car Image" });
        }

        if (!name) {
            return res.status(203).json({ "message": "Name is required" });
        }

        if (!baserate || isNaN(baserate)) {
            return res.status(203).json({ "message": "Enter The Base Rate" });
        }

        if (!carnumber) {
            return res.status(203).json({ "message": "Car Number is required" });
        }

        if (!kmprice || isNaN(kmprice)) {
            return res.status(203).json({ "message": "Enter 1/Kilometer Price" });
        }

        if (!maxpac || isNaN(maxpac)) {
            return res.status(203).json({ "message": "Enter Max Passenger Capacity" });
        }

        const updateCab = await CabsModel.updateOne({ _id: id }, { image, name, baserate, carnumber, kmprice, maxpac });

        return res.status(200).json({ "message": "Cab Update Successfully" });

    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});

router.put("/api/admin/cab/:id", admin_middleware, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updateCab = await CabsModel.deleteOne({ _id: id });

        return res.status(200).json({ "message": "Cab Delete Successfully" });

    } catch (error) {
        return res.status(500).json({ "message": "Unknown Server Error" });
    }
});
