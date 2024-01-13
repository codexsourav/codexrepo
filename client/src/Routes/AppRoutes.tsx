import { Route, Routes } from "react-router-dom";
import Error404 from "@/Pages/Error/Error404";
import Home from "@/Pages/Home/Home";


function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}
export default AppRoutes;