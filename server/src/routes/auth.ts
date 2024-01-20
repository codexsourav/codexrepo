import express, { Response, Request } from 'express';
import UsersModel from '../db/models/usersModels.js';
import { generateOTP } from '../utils/GenerateOTP.js';
import { sendOtp } from '../utils/sendOtp.js';
import { isValidMobile } from '../utils/validate.js';
import { futureTime, isDateUpToCurrent } from '../utils/MakeTimes.js';
import { setJwtToken } from '../utils/makeTwtToken.js';

const AuthRouts = express.Router();

AuthRouts.post("/api/auth", async (req: Request, res: Response) => {
    try {
        const { mobile } = req.body;
        if (!isValidMobile(mobile)) {
            return res.send({ status: "INVALID_MOBILE", message: "Invalid Mobile Number" })
        }
        const otp = generateOTP();
        const getUser = await UsersModel.findOne({ mobile });
        const timeDate = futureTime(30)
        if (getUser) {
            const updateData = await UsersModel.updateOne(
                { mobile },
                {
                    $set: { mobile, otp: { value: otp, date: timeDate } }
                },
                { new: true }
            );
        } else {

            await new UsersModel({ mobile, otp: { value: otp, date: timeDate } }).save();
        }
        await sendOtp({ otp, mobile })
        res.send({ status: "OK", message: "OTP send Successfully" })
    } catch (error) {
        console.log(error);
        res.send({ status: "INTERNAL_SERVER_ERROR", message: "OTP Send Field" })
    }

});

AuthRouts.post("/api/auth/:mobile", async (req: Request, res: Response) => {
    try {
        const { mobile } = req.params;
        const { otp } = req.body;

        const getUser = await UsersModel.findOne({ mobile });
        if (!getUser) {
            return res.send({ status: "USER_NOT_FOUND", message: "User Not Found" })
        } else if (isDateUpToCurrent(getUser.otp.date)) {
            return res.send({ status: "OTP_EXPIRE", message: "Invalid Otp is expired" })
        } else if (getUser.otp.value != otp) {
            return res.send({ status: "INVALID_OTP", message: "Invalid Otp" })
        } else {
            const token = setJwtToken({ _id: getUser._id, mobile: getUser.mobile })
            return res.send({ status: "OK", message: "Login Successful", token })
        }



    } catch (error) {
        console.log(error);

        res.send({ status: "INTERNAL_SERVER_ERROR", message: "Unknown Server error" })
    }
})

export { AuthRouts };