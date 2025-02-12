import './index.scss'
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import ServiceBanner from "../../components/ServiceBanner/index.jsx";
import ServiceAbout from "../../components/ServiceAbout/index.jsx";
import WeSell from "../../components/WeSell/index.jsx";
import LogoScroll from "../../components/LogoScroll/index.jsx";
import ShortInfo from "../../components/ShortInfo/index.jsx";
import {useParams} from "react-router";
import {useGetServiceByIdQuery} from "../../apiServices/usersApi.jsx";
import ServiceImages from "../../components/ServiceImages/index.jsx";

function ServiceDetails() {

    const params = useParams();

    const {data: getServiceById} = useGetServiceByIdQuery(params.id)
    const service = getServiceById?.data;

    return (
        <section id={"serviceDetails"}>
            <Navbar/>
            <ServiceBanner service={service}/>
            <ServiceAbout service={service}/>
            <ServiceImages service={service}/>
            <ShortInfo/>
            <LogoScroll/>
            <WeSell/>
            <Footer/>
        </section>
    );
}

export default ServiceDetails;