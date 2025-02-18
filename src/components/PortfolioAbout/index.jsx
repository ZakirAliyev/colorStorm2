import './index.scss'
import {PORTFOLIO_URL} from "../../constants.js";
import Cookies from "js-cookie";

function PortfolioAbout({service}) {

    const colorStormLang = Cookies.get("colorStormLang");

    return (
        <section id={"portfolioAbout"}>
            <div className={"container"}>
                <h2>
                    {colorStormLang === 'en' ? service?.title :
                        colorStormLang === 'az' ? service?.titleAz :
                            colorStormLang === 'ru' && service?.titleRu}
                </h2>
                <p>
                    {colorStormLang === 'en' ? service?.description :
                        colorStormLang === 'az' ? service?.descriptionAz :
                            colorStormLang === 'ru' && service?.descriptionRu}
                </p>
                <img src={PORTFOLIO_URL + service?.cardImage} alt={"Image"}/>
            </div>
        </section>
    );
}

export default PortfolioAbout;