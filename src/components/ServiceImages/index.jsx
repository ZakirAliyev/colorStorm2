import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./index.scss";
import {SERVICE_URL} from "../../constants.js";
import {useEffect} from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import VideoPlayer from "../VideoPlayer/index.jsx";

export default function ServiceImages({service}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
            });
        }, 800);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="serviceImages" data-aos="fade-up">
            <Swiper
                spaceBetween={30}
                className="mySwiper"
                breakpoints={{
                    320: {slidesPerView: 1},
                    480: {slidesPerView: 2},
                    768: {slidesPerView: 3},
                    1024: {slidesPerView: 4},
                }}
            >
                {service?.serviceImages &&
                    service.serviceImages.slice(0, 10).map((media, index) => {
                        const videoExtensions = /\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|m4v|3gp|3g2)$/i;
                        const isVideo = videoExtensions.test(media);

                        return (
                            <SwiperSlide key={index}>
                                {isVideo ? (
                                    <VideoPlayer src={SERVICE_URL + media}/>
                                ) : (
                                    <img src={SERVICE_URL + media} alt={`Service Media ${index + 1}`}/>
                                )}
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </section>
    );
}
