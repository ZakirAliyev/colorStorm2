import './index.scss'
import image1 from "/src/assets/chooseUs.png"
import {useTranslation} from "react-i18next";

function WhyChooseUs() {

    const {t} = useTranslation()

    return (
        <section id={"whyChooseUs"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <img src={image1} alt={"Image"}/>
                    </div>
                    <div className={"box col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>{t('Why choose us')}</h2>
                        <p>{t('Commodo diam vulputate dui proin quis enim nibh. Non integer ac libero facilisis hendrerit a at. Nisi sem ut sed sed faucibus at eu elit. Morbi aliquam porttitor mattis consequat neque, tellus blandit.')}</p>
                        <button>{t('Let’s connect')}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;