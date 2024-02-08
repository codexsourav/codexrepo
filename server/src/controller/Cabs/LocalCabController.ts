import { Request, Response } from "express";
import { HttpStatusCode, ServerStatus, sendResponse } from "../../utils/apiResponse/SendResponse.js";
import LocalCabsModel from "src/db/models/cabs/localMoadel.js";

export const addNewCab = async (req: Request, res: Response) => {
    try {

        const { carName, price, discount, maxPassengers, carImage, tabs } = req.body;

        if (!carName || !price || !discount || !maxPassengers || !carImage || !tabs) {
            console.log(req.body);
            return sendResponse(res, { status: HttpStatusCode.NO_CONTENT, data: { status: ServerStatus.VALIDATION_ERROR, message: "Please Enter All Value" } },);
        }

        const newCab = new LocalCabsModel(req.body);
        await newCab.save();
        return sendResponse(res, { status: HttpStatusCode.CREATED, data: { status: ServerStatus.OK, message: "Please Enter All Value" } },);

    } catch (error: any) {
        return sendResponse(res, { status: HttpStatusCode.INTERNAL_SERVER_ERROR, data: { status: ServerStatus.INTERNAL_SERVER_ERROR, message: error.toString() } },);
    }

};