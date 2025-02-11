import './index.scss'
import Work from "../Work/index.jsx";

function OurPortfolio() {
    return (
        <section id={"ourPortfolio"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"textWrapper"}>
                        <h2>Our <h2 className={"gradient"}>portfolio</h2></h2>
                        <p>Vulputate molestie molestie amet leo blandit accumsan. Sapien sed amet tellus purus sit odio
                            eget. Diam morbi faucibus vitae neque id in. Nullam sed et dapibus nunc, porta enim orci
                            urna,
                            sit. Lectus ac.</p>
                    </div>
                </div>

                <div className={"wrapper"}>
                    <div className={"left"}>
                        <Work/>
                        <Work/>
                        <Work/>
                    </div>
                    <div className={"right"}>
                        <Work/>
                        <Work/>
                        <Work/>
                    </div>
                </div>
                <div className={"button"}>
                    <button>Let’s connect</button>
                </div>
            </div>
        </section>
    );
}

export default OurPortfolio;