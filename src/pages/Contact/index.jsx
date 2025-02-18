import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import ContactUs from "../../components/ContactUs/index.jsx";

function Contact() {

    const {t} = useTranslation();

    return (
        <section id={"contactPage"}>
            <Navbar/>
            <Helmet>
                <title>{t('Contact us - ColorStorm')}</title>
            </Helmet>
            <ContactUs/>
            <Footer/>
        </section>
    );
}

export default Contact;