import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {PORTFOLIO_URL, SERVICE_URL} from "../../constants.js";
import './index.scss'
import VideoPlayer from "../VideoPlayer/index.jsx";

export default function PortfolioImages({service}) {

    return (
        <section id="portfolioImages">
            <Swiper
                spaceBetween={30}
                breakpoints={{
                    320: {slidesPerView: 1},
                    480: {slidesPerView: 2},
                    768: {slidesPerView: 3},
                    1024: {slidesPerView: 4},
                }}
                className="mySwiper"
            >
                {service?.images &&
                    service?.images.map((media, index) => {
                        const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|m4v|3gp|3g2)$/i;
                        const isVideo = videoExtensions.test(media);

                        return (
                            <SwiperSlide key={index}>
                                {isVideo ? (
                                    <VideoPlayer src={PORTFOLIO_URL + media}/>
                                ) : (
                                    <img src={PORTFOLIO_URL + media} alt={`Service Media ${index + 1}`}/>
                                )}
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </section>
    );
}