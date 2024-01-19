
import Header from "./Componets/Header/Header"
import About from "./Componets/About/About"
import Services from "./Componets/Services/Services"
import AppDownload from "./Componets/AppDownload/AppDownload"
import LatestBlogs from "./Componets/LatestBlogs/LatestBlogs"
import Footer from "@/Component/Footer/Footer"

function Home() {
    return (
        <>

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