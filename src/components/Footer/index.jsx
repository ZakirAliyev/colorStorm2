import './index.scss'
import image1 from "/src/assets/logo.png"
import {useTranslation} from "react-i18next";

function Footer() {

    const {t} = useTranslation()

    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>{t('Company')}</h2>
                        <p>{t('About us')}</p>
                        <p>{t('Team')}</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>{t('Services')}</h2>
                        <p>{t('Stage making')}</p>
                        <p>{t('Monitor repair')}</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>{t('Follow us')}</h2>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Linkedin</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <img src={image1} alt={"Logo"}/>
                        <p>{t('Get latest updates')}</p>
                        <input placeholder={`${t('Your email')}`}/>
                    </div>
                </div>
                <div className={"finish"}>
                    {t('Created by')}: qavo.agency
                </div>
            </div>
        </section>
    );
}

export default Footer;