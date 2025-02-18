import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import {FaArrowDown, FaArrowLeft} from "react-icons/fa";
import {useNavigate} from "react-router";

function ErrorPage() {

    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <section id={"errorPage"}>
            <Helmet>
                <title>{t('Page not found - ColorStorm')}</title>
            </Helmet>
            <div className={"errorPage"}>
                <div className="container">
                    <div className="copy-container center-xy">
                        <div className={"h2"}>404</div>
                        <p className={"asdpp"}>
                            Page not found.
                        </p>
                        <button onClick={() => {
                            navigate('/')
                        }}>
                            <FaArrowLeft className={"icon"}/>
                            {t('Back to main menu')}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ErrorPage;