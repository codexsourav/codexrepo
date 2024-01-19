import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRoundTrip {
    form: string;
    to: string;
    pickDate: string;
    returnDate: string;
    time: string;
    loading: boolean;
}

const initData: IRoundTrip = {
    form: '',
    pickDate: '',
    returnDate: '',
    time: '',
    to: '',
    loading: false,
};

export const roundTrip = createSlice({
    name: 'roundTrip',
    initialState: initData,
    reducers: {
        setRoundTrip: (state, { payload }: PayloadAction<{ name: string; value: string }>) => {
            return { ...state, [payload.name]: payload.value };
        },
        resetRoundTrip: () => {
            return initData;
        },
        setRoundTripLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload;
        },
    },
});

export const { setRoundTrip, resetRoundTrip, setRoundTripLoading } = roundTrip.actions;

export default roundTrip.reducer;
