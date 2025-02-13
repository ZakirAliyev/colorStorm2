import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import ShortInfo from "../../components/ShortInfo/index.jsx";
import {useParams} from "react-router";
import {useGetPortfolioByIdQuery} from "../../apiServices/usersApi.jsx";
import PortfolioAbout from "../../components/PortfolioAbout/index.jsx";
import MoreProjects from "../../components/MoreProjects/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import PortfolioImages from "../../components/PorfolioImages/index.jsx";
import {useTranslation} from "react-i18next";

function PortfolioDetails() {

    const {t} = useTranslation();
    const params = useParams();

    const {data: getServiceById} = useGetPortfolioByIdQuery(params.id)
    const service = getServiceById?.data;

    return (
        <section id={"portfolioDetails"}>
            <Navbar/>
            <PortfolioAbout service={service}/>
            <PortfolioImages service={service}/>
            <ShortInfo/>
            <MoreProjects/>
            <Footer/>
        </section>
    );
}

export default PortfolioDetails;