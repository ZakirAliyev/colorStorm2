import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import OurPortfolio from "../../components/OurPortfolio/index.jsx";

function Portfolio() {
    return (
        <section id={"portfolio"}>
            <Navbar/>
            <OurPortfolio/>
            <Footer/>
        </section>
    );
}

export default Portfolio;