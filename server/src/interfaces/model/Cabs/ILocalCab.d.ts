export interface ILocalCab {
    carName: string;
    price: {
        "40km": number;
        "4h": number;
        "80km": number;
        "8hr": number;
        "120km": number;
        "12hr": number;
        fullDay: number;
        "24hr": number;
    };
    discount: number;
    delete?: boolean;
    maxPassengers: number;
    carImage: string;
    tabs: {
        inclusionsAndExclusions: {
            fuel: {
                include: boolean;
                amount: number;
            };
            driverAllowance: boolean;
            stateTaxToll: boolean;
            gst: {
                include: boolean;
                percent: number;
            };
            payAfterKm: {
                include: boolean;
                amount: number;
            };
            multiplePickupsOrDrops: boolean;
            airportEntryOrParking: boolean;
        };
        facilities: {
            seat: number;
            bags: number;
            ac: boolean;
        };
        termsAndConditions: string[];
    };
}
