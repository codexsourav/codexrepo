import { createSlice } from '@reduxjs/toolkit'

export interface IAirport {
    trip: number,
    airport: string,
    location: string,
    pickDate: string,
    time: string,
    loading: boolean,
}
const initData: IAirport = {
    trip: 0,
    airport: "",
    location: "",
    pickDate: "",
    time: "",
    loading: false,
}

export const Airport = createSlice({
    name: 'airport',
    initialState: initData,
    reducers: {
        setAirport: (state, { payload }: { payload: { name: string, value: string } }) => {
            return { ...state, [payload.name]: payload.value }
        },
        resetAirport: () => {
            return initData;
        },
        setAirportLoading: (state, { payload }: { payload: boolean }) => {
            state.loading = payload;
        }
    }
});

export const { setAirport, setAirportLoading, resetAirport } = Airport.actions

export default Airport.reducer