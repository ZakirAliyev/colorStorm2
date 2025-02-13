import './index.scss'
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";

function Banner() {

    const {t} = useTranslation();

    return (
        <section id={"banner"}>
            <div className={"container"}>
                <h1>{t('We do')}</h1>
                <h1 className={"gradient"}>{t('Perfect')}</h1>
                <h1 className={"gradient gradient1"}>{t('Events')} <h1>{t('like')}</h1></h1>
                <h1>{t('never before')}</h1>
            </div>
        </section>
    );
}

export default Banner;