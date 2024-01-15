import { Route, Routes } from "react-router-dom";
import Error404 from "@/Pages/Error/Error404";
import Home from "@/Pages/Home/Home";
import Explore from "@/Pages/Explore/Explore";
import Booking from "@/Pages/Booking/Booking";
import Auth from "@/Pages/Auth/Auth";
import Admin from "@/Pages/Admin/Admin";
import Login from "@/Pages/Admin/Login/Login";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default AppRoutes;