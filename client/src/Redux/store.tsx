import { configureStore } from '@reduxjs/toolkit'
import loading from './Loading/loading'
import apiResponse from './Api/ApiHelper'

export default configureStore({
    reducer: {
        loading,
        apiResponse,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})