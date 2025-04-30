import './index.scss'
import {useGetAllServicesQuery} from "../../apiServices/usersApi.jsx";
import {SERVICE_CARD_URL} from "../../constants.js";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import 'aos/dist/aos.css';
import {useEffect} from "react";
// import AOS from 'aos';

function WeOffer() {

    const {data: getAllServices} = useGetAllServicesQuery()
    const services = getAllServices?.data

    const navigate = useNavigate();
    const {t} = useTranslation();

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
        <section id={"weOffer"}>
            <div className={"container"}>
                <div className={"textWrapper"}>
                    <h2 data-aos="fade-up">{t('We Offer')}</h2>
                    <p data-aos="fade-up">{t('We ensure your monitors perform at a higher level, bring your space to life with LED lights, and make your scenes unforgettable, because perfection is our standard!')}</p>
                </div>
                <div className={"row"} style={{
                    justifyContent: "center"
                }}>
                    {services && services.map((service, index) => (
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}
                             data-aos={index % 2 === 0 ? "fade-down-right" : "fade-up"}>
                            <div className={"box"}>
                                <div key={service?.id} onClick={() => {
                                    window.scrollTo(0, 0)
                                    navigate(`/services/${service?.id}`)
                                }}>
                                    <img src={SERVICE_CARD_URL + service?.serviceImageName} alt={"Image"}/>
                                    <h3>
                                        {colorStormLang === 'en' ? service?.name :
                                            colorStormLang === 'az' ? service?.nameAz :
                                                colorStormLang === 'ru' && service?.nameRu}
                                    </h3>
                                    <h4>
                                        {colorStormLang === 'en' ? service?.subTitle :
                                            colorStormLang === 'az' ? service?.subTitleAz :
                                                colorStormLang === 'ru' && service?.subTitleRu}
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeOffer;