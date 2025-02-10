import './index.scss'
import image1 from "/src/assets/logo.png"

function Footer() {
    return (
        <section id={"footer"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>Company</h2>
                        <p>About us</p>
                        <p>Team</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>Services</h2>
                        <p>Stage making</p>
                        <p>Monitor repair</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <h2>Follow us</h2>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>Linkedin</p>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-6 col-xs-12"}>
                        <img src={image1} alt={"Logo"}/>
                        <p>Get latest updates</p>
                        <input placeholder={"Your email"}/>
                    </div>
                </div>
                <div className={"finish"}>
                    Created by qavo.agency
                </div>
            </div>
        </section>
    );
}

export default Footer;