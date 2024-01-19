import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IOneWay {
    from: string;
    to: string;
    pickDate: string;
    time: string;
    loading: boolean;
}

const initData: IOneWay = {
    from: '',
    pickDate: '',
    time: '',
    to: '',
    loading: false,
};

export const oneWay = createSlice({
    name: 'oneway',
    initialState: initData,
    reducers: {
        setOneWay: (state, { payload }: PayloadAction<{ name: string; value: string }>) => {
            return { ...state, [payload.name]: payload.value };
        },
        resetOneWay: () => {
            return initData;
        },
        setOneWayLoading: (state, { payload }: PayloadAction<boolean>) => {
            return { ...state, loading: payload };
        },

    },
});

export const { setOneWay, setOneWayLoading, resetOneWay } = oneWay.actions;

export default oneWay.reducer;
