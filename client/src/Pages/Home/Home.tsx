
import Header from "./Componets/Header/Header"
import About from "./Componets/About/About"
import Services from "./Componets/Services/Services"
import AppDownload from "./Componets/AppDownload/AppDownload"
import LatestBlogs from "./Componets/LatestBlogs/LatestBlogs"
import Footer from "@/Component/Footer/Footer"
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
function Home() {
    return (
        <>

            <Header />
            <div className="w-screen  bg-orange-600 py-6">
                <div className="container w-auto flex justify-between  min-[850]:h-20  lg:gap-3 gap-4   items-center lg:flex-row flex-col">

                    <div className="flex justify-center items-center gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex justify-center items-center">
                            <FaPhone className="text-[#1f1f1f] text-sm md:text-lg" />
                        </div>
                        <p className="text-lg md:text-2xl  font-extrabold text-white" >01169266014</p>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex justify-center items-center">
                            <RiInstagramFill className="text-[#1f1f1f]  text-lg md:text-xl" />
                        </div>
                        <p className="text-lg md:text-2xl font-extrabold text-white" >@babagcabs</p>
                    </div>
                    <div className="flex justify-center items-center gap-5">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex justify-center items-center">
                            <FaLocationDot className="text-[#1f1f1f  text-lg md:text-xl]" />
                        </div>
                        <p className="text-lg md:text-2xl font-extrabold text-white" >Sector-6, Gurgaon Haryana 122006</p>
                    </div>
                </div>
            </div>
            <About />
            <Services />
            <AppDownload />
            <LatestBlogs />
            <Footer />
        </>
    )
}
export default Home