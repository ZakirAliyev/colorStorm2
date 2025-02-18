import './index.scss'
import Work from "../Work/index.jsx";
import {useGetAllPortfoliosQuery} from "../../apiServices/usersApi.jsx";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

function SomeWork() {

    const {t} = useTranslation();
    const {data: getAllPortfolios} = useGetAllPortfoliosQuery()
    const portfolios = getAllPortfolios?.data
    const navigate = useNavigate();

    return (
        <section id={"someWork"}>
            <div className={"container"}>
                <div className={"wrapper"}>
                    <div className={"left"}>
                        <h2>{t('Some pieces of our work')}</h2>
                        <p>{t('We dream, we make it happen for you! We understand your vision down to the finest details and turn it into an unforgettable design.')}</p>
                        {portfolios && portfolios.map((portfolio, index) => (
                            index % 2 === 0 && <Work portfolio={portfolio}/>
                        ))}
                    </div>
                    <div className={"right"}>
                        {portfolios && portfolios.map((portfolio, index) => (
                            index % 2 === 1 && <Work portfolio={portfolio}/>
                        ))}
                        <button onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('portfolio')
                        }}>{t('Look to our projects')}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SomeWork;