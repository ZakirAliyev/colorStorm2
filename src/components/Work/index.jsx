import './index.scss'
import {IoArrowForwardCircleOutline} from "react-icons/io5";
import {useNavigate} from "react-router";
import {PORTFOLIO_URL} from "../../constants.js";

function Work({portfolio}) {

    const navigate = useNavigate();

    return (
        <section id={"work"}>
            <img src={PORTFOLIO_URL + portfolio?.images[0]} alt={"Image"}/>
            <div className={"location"}>{portfolio?.location}</div>
            <h2>{portfolio?.title}</h2>
            <div className={"p"} onClick={() => {
                navigate('/')
            }}>Read more <IoArrowForwardCircleOutline/></div>
        </section>
    );
}

export default Work;