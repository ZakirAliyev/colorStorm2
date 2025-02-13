import './index.scss'
import {useGetAllServicesQuery} from "../../apiServices/usersApi.jsx";
import {SERVICE_CARD_URL} from "../../constants.js";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

function WeOffer() {

    const {data: getAllServices} = useGetAllServicesQuery()
    const services = getAllServices?.data

    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <section id={"weOffer"}>
            <div className={"container"}>
                <div className={"textWrapper"}>
                    <h2>{t('We Offer')}</h2>
                    <p>{t('Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in elit. Morbi rhoncus, tellus, eros consequat magna semper orci a tincidunt.')}</p>
                </div>
                <div className={"row"}>
                    {services && services.map((service) => (
                        <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                            <div className={"box"}>
                                <div key={service?.id} onClick={() => {
                                    window.scrollTo(0, 0)
                                    navigate(`/services/${service?.id}`)
                                }}>
                                    <img src={SERVICE_CARD_URL + service?.serviceImageName} alt={"Image"}/>
                                    <h3>{service?.name}</h3>
                                    <h4>{service?.subTitle}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WeOffer;