import Navbar from "@/Component/Navbar/Navbar"
import Header from "./Componets/Header/Header"
import AboutUS from "./Componets/AboutUS/AboutUS"
import About from "./Componets/About/About"
import Services from "./Componets/Services/Services"
import AppDownload from "./Componets/AppDownload/AppDownload"
import LatestBlogs from "./Componets/LatestBlogs/LatestBlogs"
import Footer from "@/Component/Footer/Footer"

function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <About />
            <Services />
            <AppDownload />
            <LatestBlogs />
            <Footer />
        </>
    )
}
export default Home