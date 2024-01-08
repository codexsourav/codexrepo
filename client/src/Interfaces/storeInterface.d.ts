import store from "../Redux/store";
import { ApiHelperInitialStateType } from "./apiHelper/ApiData";
export type AppDispatch = (typeof store.dispatch);

export default interface StoreType {
    loading: {
        value: number;
    };
    apiResponse: ApiHelperInitialStateType,
}