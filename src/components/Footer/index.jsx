import "./index.scss";
import image1 from "/src/assets/logoWhite.png";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useGetAllServicesQuery} from "../../apiServices/usersApi.jsx";
import * as React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";
import 'aos/dist/aos.css';
import {useEffect} from "react";

function Footer() {
    const {t} = useTranslation();
    const {data: getAllServices} = useGetAllServicesQuery();
    const services = getAllServices?.data;
    const colorStormLang = Cookies.get("colorStormLang");
    const navigate = useNavigate();

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
        <section id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-3 col-md-6 col-sm-6 col-xs-12">
                        <h2 className={"h2h2h2"}>{t("Company")}</h2>
                        <Link className={"p"} to="/about">{t("About us")}</Link>
                        <Link className={"p"} to="/">+994 (77) 305-50-55</Link>
                        <Link className={"p"} to="/">+994 (55) 867-67-60</Link>
                    </div>
                    <div className="col-3 col-md-6 col-sm-6 col-xs-12">
                        <h2 className={"h2h2h2"}>{t("Services")}</h2>
                        {services && services?.slice(0, 3).map((service) => (
                            <Link className={"p"} to="/">
                                {colorStormLang === 'en' ? service?.name :
                                    colorStormLang === 'az' ? service?.nameAz :
                                        colorStormLang === 'ru' && service?.nameRu}
                            </Link>
                        ))}
                    </div>
                    <div className="col-3 col-md-6 col-sm-6 col-xs-12">
                        <h2 className={"h2h2h2"}>{t("Follow us")}</h2>
                        <Link className={"p"} to="/">Instagram</Link>
                        <Link className={"p"} to="/">Facebook</Link>
                        <Link className={"p"} to="/">Linkedin</Link>
                    </div>
                    <div className="col-3 col-md-6 col-sm-6 col-xs-12">
                        <img style={{
                            cursor: "pointer",
                        }} onClick={() => {
                            navigate("/")
                        }} src={image1} alt="Logo"/>
                        <Link className={"p"} to="/"><a style={{
                            color: '#c5c5c5'
                        }}
                                                        href={"mailto:info@colorstorm.com.az"}>info@colorstorm.com.az</a></Link>
                    </div>
                </div>
                <div
                    className="finish">{t('Address')} : {t('Baku city, Sabail district, Academician Ahad Yagubov street, Bayil settlement')}</div>
                <div className="finish">
                    {t("Created by")}: <span onClick={() => {
                    window.location.href = 'https://qavo.az/'
                }}>qavo.az</span>
                </div>
            </div>
        </section>
    );
}

export default Footer;