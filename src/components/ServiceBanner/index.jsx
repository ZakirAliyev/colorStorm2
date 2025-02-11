import './index.scss'
import React from 'react';

function ServiceBanner({service}) {

    return (
        <>
            <section id={"serviceBanner"}>
                <div className={"container container1"}>
                    <h2>{service?.name}</h2>
                    <p>Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta feugiat scelerisque in
                        elit.
                        Morbi
                        rhoncus, tellus, eros Risus commodo id odio turpis pharetra elementum. Pulvinar porta porta
                        feugiat
                        scelerisque in elit. Morbi rhoncus, tellus, eros </p>
                    <button>Contact us</button>
                </div>
            </section>
            <div className={"bannerLayer"}></div>
        </>
    );
}

export default ServiceBanner;