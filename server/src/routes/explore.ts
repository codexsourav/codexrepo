import express, { Response, Request } from 'express';
import CabsModel from '../db/models/CabsMoadel.js';
import axios from 'axios';
import DestinationModel from '../db/models/destinationModule.js';
const ExploreRouts = express.Router();
ExploreRouts.post("/api/explore/:type", async (req: Request, res: Response) => {

    try {
        const { type } = req.params;
        const { from, to } = req.body;
        var destinationData = null;
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
        const cabs = await CabsModel.find({ delete: false });
        res.send({ cabs, "destination": destinationData });
    } catch (error: any) {
        console.log(error);

        res.send({ error: error.toString(), cabs: [], "destination": destinationData });
    }
});

export { ExploreRouts };