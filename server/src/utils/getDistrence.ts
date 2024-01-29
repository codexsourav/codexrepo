import axios from "axios";
import DestinationModel from "../db/models/destinationModule.js";

interface IDestination {
    _id?: string;
    from: string;
    to: string;
    data: {
        distance: {
            text: string;
            value: number;
        };
        duration: {
            text: string;
            value: number;
        };
        status: string;
    };
    __v?: number;
}



export const getDistance = async ({ from, to }: { from: string, to: string }): Promise<IDestination | null> => {
    try {
        var destinationData: IDestination | null = null;
        const searchDestinationData = await DestinationModel.findOne({ from, to });
        if (searchDestinationData) {
            destinationData = searchDestinationData as any;
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
        return destinationData;
    } catch (error) {
        throw error;
    }
}

export const getRoundTripDistance = async (data: string[]): Promise<IDestination> => {
    try {
        var totalKm = 0;
        var totalTime = 0;
        for (let i = 0; i < data.length - 1; i++) {
            const destinationData = await getDistance({ from: data[i], to: data[i + 1] });
            totalKm = totalKm + ((destinationData?.data.distance.value || 0) / 1000);
            totalTime = totalTime + (destinationData?.data.duration.value || 0);
            // console.log({ from: data[i], to: data[i + 1] });
            // console.log((destinationData?.data.distance.value || 0) / 1000);
        }
        return {
            from: data[0],
            to: data[data.length - 1],
            data: {
                distance: {
                    text: Math.round(totalKm) + " Km",
                    value: totalKm * 1000,
                },
                duration: {
                    text: totalTime.toString(),
                    value: totalTime,
                },
                status: "OK",
            }
        };
    } catch (error) {
        throw error;
    }
}