import './index.scss'
import {PORTFOLIO_URL} from "../../constants.js";

function PortfolioAbout({service}) {
    return (
        <section id={"portfolioAbout"}>
            <div className={"container"}>
                <h2>{service?.title}</h2>
                <p>{service?.description}</p>
                <img src={PORTFOLIO_URL + service?.cardImage} alt={"Image"}/>
            </div>
        </section>
    );
}

export default PortfolioAbout;