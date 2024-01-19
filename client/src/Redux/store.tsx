import { configureStore } from '@reduxjs/toolkit'
import loading from './Loading/loading'
import oneWay from './TripBox/OneWay'
import roundTrip from './TripBox/RoundTrip'
import local from './TripBox/Local'
import airport from './TripBox/Airport'





import apiResponse from './Api/ApiHelper'

export default configureStore({
    reducer: {
        loading,
        apiResponse,
        oneWay,
        roundTrip,
        local,
        airport,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})