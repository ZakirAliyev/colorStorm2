import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import AboutBanner from "../../components/AboutBanner/index.jsx";

function About() {

    const {t} = useTranslation();

    return (
        <section id={"aboutPage"}>
            <Navbar/>
            <Helmet>
                <title>{t('About - ColorStorm')}</title>
            </Helmet>
            <AboutBanner/>
            <Footer/>
        </section>
    );
}

export default About;