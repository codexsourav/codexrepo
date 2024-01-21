export interface ICabData {
    _id: string;
    name: string;
    baserate: number;
    carnumber: string;
    image: string;
    parkm: number;
    maxpac: number;
    delete: boolean;
    isAllow: boolean;
    date: {
        $date: string;
    };
    __v: number;
}

export interface IRouteData {
    _id: {
        $oid: string;
    };
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
    __v: number;
}