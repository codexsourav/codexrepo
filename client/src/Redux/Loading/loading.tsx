import { createSlice } from '@reduxjs/toolkit'

export const loading = createSlice({
    name: 'loading',
    initialState: {
        value: 100
    },
    reducers: {
        setLoader: (state, { payload }: { payload: number }) => {
            state.value += payload;
        }
    }
});

export const { setLoader } = loading.actions

export default loading.reducer