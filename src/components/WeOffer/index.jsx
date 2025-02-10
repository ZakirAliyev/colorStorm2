import './index.scss'
import image1 from "/src/assets/bg.jpg"

function WeOffer() {
    return (
        <section id={"weOffer"}>
            <div className={"container"}>
                <div className={"textWrapper"}>
                    <h2>We Offer</h2>
                    <p>Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in
                        elit.
                        Morbi rhoncus, tellus, eros consequat magna semper orci a tincidunt. </p>
                </div>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            <img src={image1} alt={"Image"}/>
                            <h3>Stage creation</h3>
                            <h4>Integer ante non nunc, eget est justo vel semper nunc.</h4>
                        </div>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            <img src={image1} alt={"Image"}/>
                            <h3>Monitor repair</h3>
                            <h4>Integer ante non nunc, eget est justo vel semper nunc.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WeOffer;