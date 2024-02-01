import { Route, Routes } from "react-router-dom";
import Error404 from "@/Pages/Error/Error404";
import Home from "@/Pages/Home/Home";
import Booking from "@/Pages/Booking/Booking";
import Auth from "@/Pages/Auth/Auth";
import Admin from "@/Pages/Admin/Admin";
import Login from "@/Pages/Admin/Login/Login";
import Profile from "@/Pages/Profile/Profile";
import Protected from "@/Lib/Protected";
import MakeBooking from "@/Pages/Admin/MakeBooking";
import OneWayExplore from "@/Pages/Explore/OneWay/OneWayExplore";
import RoundTripExplore from "@/Pages/Explore/RoundTrip/RoundTrip";
import LocalExplore from "@/Pages/Explore/Local/Local";
import AirportExplore from "@/Pages/Explore/Airport/Airport";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/test" element={<CityInput />} /> */}

            <Route path="/explore/oneway" element={<OneWayExplore />} />
            <Route path="/explore/roundtrip" element={<RoundTripExplore />} />
            <Route path="/explore/local" element={<LocalExplore />} />
            <Route path="/explore/airport" element={<AirportExplore />} />

            <Route path="/booking" element={<Booking />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Protected page={<Profile />} />} />
            <Route path="/admin" element={<Protected isadmin={true} page={<Admin />} />} />
            <Route path="/admin/new/:id" element={<Protected isadmin={true} page={<MakeBooking />} />} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    );
}

export default AppRoutes;