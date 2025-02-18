import './index.scss'
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import {useNavigate} from "react-router";

function ServiceAbout({service}) {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const colorStormLang = Cookies.get("colorStormLang");

    return (
        <section id={"serviceAbout"}>
            <div className={"container"}>
                <div className={"box"}>
                    <h2>{t('About service')}</h2>
                    <p>
                        {colorStormLang === 'en' ? service?.description :
                            colorStormLang === 'az' ? service?.descriptionAz :
                                colorStormLang === 'ru' && service?.descriptionRu}
                    </p>
                </div>
                <div className={"button"}>
                    <button onClick={() => {
                        window.scrollTo(0, 0)
                        navigate('/contact')
                    }}>{t('Let’s connect')}</button>
                </div>
            </div>
        </section>
    );
}

export default ServiceAbout;