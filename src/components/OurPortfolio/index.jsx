import './index.scss'
import Work from "../Work/index.jsx";
import {useGetAllPortfoliosQuery} from "../../apiServices/usersApi.jsx";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

function OurPortfolio() {

    const {t} = useTranslation();
    const {data: getAllPortfolios} = useGetAllPortfoliosQuery()
    const portfolios = getAllPortfolios?.data

    const navigate = useNavigate();

    return (
        <section id={"ourPortfolio"}>
            <div className={"container"}>
                <div className={"box"}>
                    <div className={"textWrapper"}>
                        <h2>{t('Our')} <h2 className={"gradient"}>{t('portfolio')}</h2></h2>
                        <p>{t('We bring the image back to life! We give your devices a second life by applying high precision and technological innovations in the field of monitor repair.\n' +
                            'We combine light and art! We provide aesthetic and functional lighting solutions to your spaces with the installation and sale of LED lighting systems.\n' +
                            'We add splendor to the stages! With our creative approach to stage design and construction, we turn every event into an unforgettable show.\n' +
                            'Every project is art for us! Our company creates special stage and lighting concepts according to the requirements of our customers.\n' +
                            'Our professional team is here for you! We provide the highest level of service with our experienced engineers and designers.')}</p>
                    </div>
                </div>
                <div className={"wrapper"}>
                    <div className={"left"}>
                        {portfolios &&
                            portfolios.map((portfolio, index) =>
                                index % 2 === 0 ? <div onClick={() => {
                                    window.scrollTo(0, 0)
                                    navigate(`/portfolio/${portfolio?.id}`)
                                }}>
                                    <Work key={portfolio?.id} portfolio={portfolio}/>
                                </div> : null
                            )
                        }
                    </div>
                    <div className={"right"}>
                        {portfolios &&
                            portfolios.map((portfolio, index) =>
                                index % 2 === 1 ? <div onClick={() => {
                                    console.log(portfolio?.id)
                                }}>
                                    <Work key={portfolio?.id} portfolio={portfolio}/>
                                </div> : null
                            )
                        }
                    </div>
                </div>
                <div className={"button"}>
                    <button onClick={() => {
                        window.scrollTo(0, 0)
                        navigate('/contact')
                    }}>{t('Let’s connect')}</button>
                </div>
            </div>
        </section>
    );
}

export default OurPortfolio;