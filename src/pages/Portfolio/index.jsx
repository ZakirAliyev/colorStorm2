import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import OurPortfolio from "../../components/OurPortfolio/index.jsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";

function Portfolio() {

    const {t} = useTranslation();

    return (
        <section id={"portfolio"}>
            <Helmet>
                <title>{t('Portfolios - ColorStorm')}</title>
            </Helmet>
            <Navbar/>
            <OurPortfolio/>
            <Footer/>
        </section>
    );
}

export default Portfolio;