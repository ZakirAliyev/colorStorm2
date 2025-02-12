import './index.scss'

import React from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import image1 from "/src/assets/bg.jpg"
import Work from "../Work/index.jsx";
import {useGetAllPortfoliosQuery} from "../../apiServices/usersApi.jsx";

function MoreProjects() {

    const {data: getAllPortfolios} = useGetAllPortfoliosQuery()
    const portfolios = getAllPortfolios?.data

    return (
        <section id={"moreProjects"}>
            <div className={"container"}>
                <h2>More from our projects</h2>
                <Swiper
                    spaceBetween={30}
                    className="mySwiper"
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        480: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {portfolios && portfolios.map((portfolio) => (
                        <SwiperSlide>
                            <Work portfolio={portfolio}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className={"button"}>
                    <button>Let’s connect</button>
                </div>
            </div>
        </section>
    );
}

export default MoreProjects;