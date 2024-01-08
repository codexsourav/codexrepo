import { Route, Routes } from "react-router-dom";
import Error404 from "@/Pages/Error/Error404";
import Test from "@/Pages/Test";
import Home from "@/Pages/Home";
import Protected from "@/Lib/Protected";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Protected page={<Test count={0} />} />} />
            <Route path="*" element={<Error404 />} />
        </Routes>
    )
}
export default AppRoutes;