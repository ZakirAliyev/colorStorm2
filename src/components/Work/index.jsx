import './index.scss'
import {IoArrowForwardCircleOutline} from "react-icons/io5";
import {useLocation, useNavigate} from "react-router";
import {PORTFOLIO_URL} from "../../constants.js";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import {useEffect} from "react";
import 'aos/dist/aos.css';

function Work({portfolio}) {


    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const disableTransition = location.pathname.includes("portfolio/");
    const colorStormLang = Cookies.get("colorStormLang");


    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 800); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
    }, []);


    return (
        <section id={"work"} className={disableTransition ? "no-hover no-transition" : ""}>
            <img src={PORTFOLIO_URL + portfolio?.images[0]} alt={"Image"}/>
            <div className={"location"}>{portfolio?.location}</div>
            <h2>
                {colorStormLang === 'en' ? portfolio.title :
                    colorStormLang === 'az' ? portfolio.titleAz :
                        colorStormLang === 'ru' && portfolio.titleRu}
            </h2>
            <div className={"p"} onClick={() => {
                window.scrollTo(0, 0)
                navigate(`/portfolio/${portfolio?.id}`);
            }}>{t('Read more')} <IoArrowForwardCircleOutline/></div>
        </section>
    );
}

export default Work;