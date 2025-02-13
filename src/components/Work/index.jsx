import './index.scss'
import {IoArrowForwardCircleOutline} from "react-icons/io5";
import {useLocation, useNavigate} from "react-router";
import {PORTFOLIO_URL} from "../../constants.js";
import {useTranslation} from "react-i18next";

function Work({portfolio}) {


    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const disableTransition = location.pathname.includes("portfolio/");

    return (
        <section id={"work"} className={disableTransition ? "no-hover no-transition" : ""}>
            <img src={PORTFOLIO_URL + portfolio?.images[0]} alt={"Image"}/>
            <div className={"location"}>{portfolio?.location}</div>
            <h2>{portfolio?.title}</h2>
            <div className={"p"} onClick={() => {
                window.scrollTo(0, 0)
                navigate(`/portfolio/${portfolio?.id}`);
            }}>{t('Read more')} <IoArrowForwardCircleOutline/></div>
        </section>
    );
}

export default Work;