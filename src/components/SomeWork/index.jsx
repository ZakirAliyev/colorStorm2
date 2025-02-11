import './index.scss'
import image1 from "/src/assets/chooseUs.png"
import Work from "../Work/index.jsx";
import {useGetAllPortfoliosQuery} from "../../apiServices/usersApi.jsx";

function SomeWork() {

    const {data: getAllPortfolios} = useGetAllPortfoliosQuery()
    const portfolios = getAllPortfolios?.data

    return (
        <section id={"someWork"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"left"}>
                        <h2>Some pieces of our work</h2>
                        <p>Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in
                            elit. Morbi rhoncus, tellus, eros consequat magna semper orci a tincidunt. </p>
                        {portfolios && portfolios.map((portfolio, index) => (
                            index % 2 === 0 && <Work portfolio={portfolio}/>
                        ))}
                    </div>
                    <div className={"right"}>
                        {portfolios && portfolios.map((portfolio, index) => (
                            index % 2 === 1 && <Work portfolio={portfolio}/>
                        ))}
                        <button>Look to our projects</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SomeWork;