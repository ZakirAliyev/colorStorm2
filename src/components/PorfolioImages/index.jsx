import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';
import {PORTFOLIO_URL, SERVICE_CARD_URL, SERVICE_URL} from "../../constants.js";

export default function PortfolioImages({service}) {

    return (
        <section id="serviceImages">
            <Swiper
                spaceBetween={30}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    480: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
                className="mySwiper"
            >
                {service?.images && service?.images.slice(0, 10).map((image, index) => (
                    <SwiperSlide>
                        <img src={PORTFOLIO_URL + image} alt="Image"/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}