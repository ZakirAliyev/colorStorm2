import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';
import {SERVICE_URL} from "../../constants.js";
import {useEffect} from "react";
import 'aos/dist/aos.css';

export default function ServiceImages({service}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 800); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
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
                {service?.serviceImages && service?.serviceImages.slice(0, 10).map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={SERVICE_URL + image} alt={`Service Image ${index + 1}`}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
