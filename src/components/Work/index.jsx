import './index.scss'
import image1 from "/src/assets/bg.jpg"
import {IoArrowForwardCircleOutline} from "react-icons/io5";

function Work() {
    return (
        <section id={"work"}>
            <img src={image1} alt={"Image"}/>
            <div className={"location"}>Baku,azerbaijan</div>
            <h2>Creative landing page</h2>
            <div className={"p"}>Read more <IoArrowForwardCircleOutline/></div>
        </section>
    );
}

export default Work;