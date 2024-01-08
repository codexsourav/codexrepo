import { useDispatch, useSelector } from "react-redux";

// import { setLoader } from "../Redux/Loading/loading";
import React from "react";
import StoreType, { AppDispatch } from "@/Interfaces/storeInterface";
import { MakeApiRequest } from "@/Redux/Api/ApiHelper";


function Home() {
    const loading = useSelector((state: StoreType) => state.apiResponse);
    const dispatch = useDispatch<AppDispatch>();
    console.log(import.meta.env.VITE_HELLO);

    return (
        <div>
            {loading.isLoading ? <p>Loading....</p> : loading.data != null ? <p>{loading.data.data.title}</p> : loading.error ? <p>Error Is Here</p> : <p>Load Data</p>}
            <button onClick={() => dispatch(MakeApiRequest({ path: "/todos/1" }))}>Set Progress</button>

            <p>{import.meta.env.VITE_HELLO ?? "ON NO"} </p>
        </div>
    )
}

export default React.memo(Home);