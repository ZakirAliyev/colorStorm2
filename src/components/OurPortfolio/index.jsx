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
                        <p>{t('Vulputate molestie molestie amet leo blandit accumsan. Sapien sed amet tellus purus sit odio eget. Diam morbi faucibus vitae neque id in. Nullam sed et dapibus nunc, porta enim orci urna, sit. Lectus ac.')}</p>
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
                    <button>{t('Let’s connect')}</button>
                </div>
            </div>
        </section>
    );
}

export default OurPortfolio;