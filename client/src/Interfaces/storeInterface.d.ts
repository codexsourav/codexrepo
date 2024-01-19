import { IRoundTrip } from './../Redux/TripBox/RoundTrip';
import { ILocal, oneWay } from './../Redux/TripBox/Local';
import store from "../Redux/store";
import { ApiHelperInitialStateType } from "./apiHelper/ApiData";
import { IOneWay } from '@/Redux/TripBox/OneWay';
import { IAirport } from '@/Redux/TripBox/Airport';
export type AppDispatch = (typeof store.dispatch);

export default interface StoreType {
    loading: {
        value: number;
    };
    oneWay: IOneWay;
    roundTrip: IRoundTrip;
    local: ILocal;
    airport: IAirport;
    apiResponse: ApiHelperInitialStateType,
}