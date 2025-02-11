import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';
import image1 from '/src/assets/bg.jpg';

export default function ServiceImages() {

    return (
        <section id="serviceImages">
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={image1} alt="Image" />
                </SwiperSlide>
            </Swiper>
        </section>
    );
}