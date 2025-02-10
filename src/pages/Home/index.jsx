import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import Banner from "../../components/Banner/index.jsx";
import ShortInfo from "../../components/ShortInfo/index.jsx";
import LogoScroll from "../../components/LogoScroll/index.jsx";
import WeOffer from "../../components/WeOffer/index.jsx";
import WhyChooseUs from "../../components/WhyChooseUs/index.jsx";
import WeSell from "../../components/WeSell/index.jsx";
import SomeWork from "../../components/SomeWork/index.jsx";

function Home() {
    return (
        <section id={"home"}>
            <Navbar/>
            <Banner/>
            <ShortInfo/>
            <LogoScroll/>
            <WeOffer/>
            <WhyChooseUs/>
            <WeSell/>
            <SomeWork/>
            <Footer/>
        </section>
    );
}

export default Home;