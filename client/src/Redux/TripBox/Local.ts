import { createSlice } from '@reduxjs/toolkit'

export interface ILocal {
    form: string,
    pickDate: string,
    time: string,
    loading: boolean,
}
const initData: ILocal = {
    form: "",
    pickDate: "",
    time: "",
    loading: false,
}

export const Local = createSlice({
    name: 'local',
    initialState: initData,
    reducers: {
        setLocal: (state, { payload }: { payload: { name: string, value: string } }) => {
            return { ...state, [payload.name]: payload.value }
        },
        resetLocal: () => {
            return initData;
        },
        setLocalLoading: (state, { payload }: { payload: boolean }) => {
            state.loading = payload;
        }
    }
});

export const { setLocal, setLocalLoading, resetLocal } = Local.actions

export default Local.reducer