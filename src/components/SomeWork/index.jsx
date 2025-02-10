import './index.scss'
import image1 from "/src/assets/chooseUs.png"
import Work from "../Work/index.jsx";

function SomeWork() {
    return (
        <section id={"someWork"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"left"}>
                        <h2>Some pieces of our work</h2>
                        <p>Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in
                            elit. Morbi rhoncus, tellus, eros consequat magna semper orci a tincidunt. </p>
                        <Work/>
                        <Work/>
                    </div>
                    <div className={"right"}>
                        <Work/>
                        <Work/>
                        <button>Look to our projects</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SomeWork;