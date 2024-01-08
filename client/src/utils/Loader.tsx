import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import StoreType from "../Interfaces/storeInterface.d";
import { setLoader } from "../Redux/Loading/loading";
import React from "react";

function Loader() {
    const loading = useSelector((state: StoreType) => state.loading);
    const dispatch = useDispatch();
    return (
        <LoadingBar
            color='#f11946'
            height={5}
            progress={loading.value}
            onLoaderFinished={() => dispatch(setLoader(0))}
        />
    );
}
export default React.memo(Loader);