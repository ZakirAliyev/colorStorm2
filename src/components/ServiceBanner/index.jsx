import './index.scss'
import React from 'react';
import {SERVICE_CARD_URL} from "../../constants.js";

function ServiceBanner({service}) {

    return (
        <>
            <section id={"serviceBanner"} style={{
                backgroundImage: `url(${SERVICE_CARD_URL + service?.serviceImageName})`
            }}>
                <div className={"container container1"}>
                    <h2>{service?.name}</h2>
                    <p>{service?.subTitle}</p>
                    <button>Contact us</button>
                </div>
            </section>
            <div className={"bannerLayer"}></div>
        </>
    );
}

export default ServiceBanner;