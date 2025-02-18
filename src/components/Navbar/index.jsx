import './index.scss';
import {Link} from "react-router-dom";
import {useState} from "react";
import {FaBars, FaChevronDown} from "react-icons/fa";
import {useGetAllServicesQuery} from "../../apiServices/usersApi.jsx";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import enFlag from "/src/assets/en.png"
import azFlag from "/src/assets/az.png"
import ruFlag from "/src/assets/ru.png"
import BurgerMenu from "../BurgerMenu/index.jsx";
import logo from "/src/assets/logo.png";

function Navbar() {
    const {t, i18n} = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        Cookies.set('colorStormLang', lng);
        setShowLanguageDropdown(false);
        window.location.reload();
    };

    const [showDropdown, setShowDropdown] = useState(false);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const {data: getAllServices} = useGetAllServicesQuery();
    const services = getAllServices?.data;

    const colorStormLang = Cookies.get("colorStormLang");

    return (
        <section id={"navbar"}>
            <Link to={`/`}><img src={logo} alt={"Logo"} className={"logoImg"}/></Link>

            <div className={"name1name1"}>
                <div className={"links"}>
                    <Link to={`/`} className={"link"}>{t('Home page')}</Link>
                    <Link to={`/products`} className={"link"}>{t('Products')}</Link>

                    <div className={"services-dropdown"}>
                        <button className="link dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
                            {t('Services')} <FaChevronDown className={`chevron ${showDropdown ? "rotate" : ""}`}/>
                        </button>

                        {showDropdown && (
                            <div className="dropdown-menu">
                                {services && services.map((service, index) => (
                                    <>
                                        <Link
                                            to={`/services/${service?.id}`}
                                            className="dropdown-item"
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            {colorStormLang === 'en' ? service?.name :
                                                colorStormLang === 'az' ? service?.nameAz :
                                                    colorStormLang === 'ru' && service?.nameRu}
                                        </Link>
                                        <div className={"line1"}></div>
                                    </>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to={`/portfolio`} className={"link"}>{t('Portfolio')}</Link>

                    <Link to={`/about`} className={"link"}>{t('About us')}</Link>
                    <Link to={`/contact`} className={"link"}>{t('Contact')}</Link>
                </div>
                <div className={"language-dropdown"}>
                    <button className="link dropdown-toggle"
                            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}>
                        <img
                            src={
                                colorStormLang === 'en' ? enFlag :
                                    colorStormLang === 'az' ? azFlag :
                                        colorStormLang === 'ru' ? ruFlag : ''
                            }
                            alt="Flag"
                            className="flag-icon"
                        />
                        <FaChevronDown className={`chevron ${showLanguageDropdown ? "rotate" : ""}`}/>
                    </button>

                    {showLanguageDropdown && (
                        <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => changeLanguage('en')}>
                                <img src={enFlag} alt="English" className="flag-icon"/> {t('English')}
                            </button>
                            <div className={"line1"}></div>
                            <button className="dropdown-item" onClick={() => changeLanguage('az')}>
                                <img src={azFlag} alt="Azerbaijani" className="flag-icon"/> {t('Azerbaijani')}
                            </button>
                            <div className={"line1"}></div>
                            <button className="dropdown-item" onClick={() => changeLanguage('ru')}>
                                <img src={ruFlag} alt="Russian" className="flag-icon"/>{t('Russian')}
                            </button>
                        </div>
                    )}
                </div>
                <div className={"icon"}><BurgerMenu/></div>
            </div>
        </section>
    );
}

export default Navbar;