import express, { Response, Request } from 'express';
import CabsModel from '../db/models/CabsMoadel.js';
import axios from 'axios';
import DestinationModel from '../db/models/destinationModule.js';
import { getDistance, getRoundTripDistance } from '../utils/getDistrence.js';
import { datetoDays } from '../utils/MakeTimes.js';
const ExploreRouts = express.Router();


ExploreRouts.post("/api/explore/oneway", async (req: Request, res: Response) => {
    try {
        const { from, to } = req.body;
        const destinationData = await getDistance({ from, to });
        const cabs = await CabsModel.find({ delete: false, allowTrip: "oneway" });
        return res.send({ cabs, "destination": destinationData });
    } catch (error: any) {
        console.log(error);
        return res.status(400).send({ error: error.toString(), cabs: [], "destination": {} });
    }
});

ExploreRouts.post("/api/explore/local", async (req: Request, res: Response) => {
    try {
        const cabs = await CabsModel.find({ delete: false, allowTrip: "local" });
        return res.send({ cabs });
    } catch (error: any) {
        console.log(error);
        return res.status(400).send({ error: error.toString(), cabs: [], "destination": {} });
    }
});

ExploreRouts.post("/api/explore/airport", async (req: Request, res: Response) => {
    try {
        const { from, to } = req.body;
        const destinationData = await getDistance({ from, to });
        const cabs = await CabsModel.find({ delete: false, allowTrip: "airport" });
        return res.send({ cabs, "destination": destinationData });
    } catch (error: any) {
        console.log(error);
        return res.status(400).send({ error: error.toString(), cabs: [], "destination": {} });
    }
});


ExploreRouts.post("/api/explore/roundtrip", async (req: Request, res: Response) => {
    try {
        const { type } = req.params;
        const { from, to, fDate, toDate } = req.body;
        // console.log(to.split("||"));

        const data: string[] = [from, ...to.split("||")];
        // console.log(data);

        const destinationData = await getRoundTripDistance(data);
        const getDatetoDays = datetoDays(fDate, toDate);
        console.log(getDatetoDays);

        const cabs = await CabsModel.find({ delete: false, allowTrip: "roundtrip" });
        res.send({ cabs, "destination": destinationData });
    } catch (error: any) {
        console.log(error);
        return res.status(500).send({ error: error.toString(), cabs: [], "destination": {} });
    }
});


export { ExploreRouts };

