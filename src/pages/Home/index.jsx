import { useState, useEffect } from "react";
import "./index.scss";
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import Banner from "../../components/Banner/index.jsx";
import ShortInfo from "../../components/ShortInfo/index.jsx";
import LogoScroll from "../../components/LogoScroll/index.jsx";
import WeOffer from "../../components/WeOffer/index.jsx";
import WhyChooseUs from "../../components/WhyChooseUs/index.jsx";
import WeSell from "../../components/WeSell/index.jsx";
import SomeWork from "../../components/SomeWork/index.jsx";
import image1 from "/src/assets/logoWhite.png";
import {Helmet} from "react-helmet-async";

function LoadingScreen({ fadeOut }) {
    return (
        <div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
            <img src={image1} alt={"Image"} />
            <div className="spinner"></div>
        </div>
    );
}

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="home">
            <Helmet>
                <title>Ana səhifə - ColorStorm</title>
            </Helmet>
            {isLoading ? (
                <LoadingScreen fadeOut={fadeOut} />
            ) : (
                <section>
                    <Navbar />
                    <Banner />
                    <ShortInfo />
                    <LogoScroll />
                    <WeOffer />
                    <WhyChooseUs />
                    <WeSell />
                    <SomeWork />
                    <Footer />
                </section>
            )}
        </section>
    );
}

export default Home;
