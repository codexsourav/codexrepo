import React from "react";
import Header from "./Components/Header/Header";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import LatestBlogs from "./Components/LatestBlogs/LatestBlogs";
import TripInfo from "./Components/TripInfo/TripInfo";
import AppDownload from "./Components/AppDownload/AppDownload";
function Home() {

    return (
        <>
            <Header />
            <Services />
            <About />
            <TripInfo />
            <LatestBlogs />
            <AppDownload />
        </>
    )
}

export default React.memo(Home);