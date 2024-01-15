import { Route, Routes } from "react-router-dom";
import Error404 from "@/Pages/Error/Error404";
import Home from "@/Pages/Home/Home";
import Explore from "@/Pages/Explore/Explore";
import Booking from "@/Pages/Booking/Booking";



function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}
export default AppRoutes;