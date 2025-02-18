import React, {useEffect, useState} from "react";
import "./index.scss";
import {useGetAllBrandsQuery} from "../../apiServices/usersApi.jsx";
import {BRAND_URL} from "../../constants.js";
import 'aos/dist/aos.css';

function LogoScroll() {
    const {data: getAllBrands} = useGetAllBrandsQuery();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        if (getAllBrands?.data) {
            const repeatedBrands = [];
            for (let i = 0; i < 100; i++) {
                repeatedBrands.push(...getAllBrands.data);
            }
            setBrands(repeatedBrands);
        }
    }, [getAllBrands]);

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
        <section id="logoScroll" data-aos="fade-up">
            <div className="wrapper left">
                {brands.map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={BRAND_URL + brand?.imageName} alt="Logo"/>
                    </div>
                ))}
            </div>
            <div className="wrapper right">
                {brands.slice().reverse().map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={BRAND_URL + brand?.imageName} alt="Logo"/>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;