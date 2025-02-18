import './index.scss'
import React, {useEffect} from "react";
import image1 from "/src/assets/bg.jpg"
import image2 from "/src/assets/about.jpg"
import {useTranslation} from "react-i18next";
import 'aos/dist/aos.css';
import AOS from 'aos';

function AboutBanner() {

    const {t} = useTranslation()

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
        <section id={"aboutBanner1"}>
            <div id={"aboutBanner"}>
                <h2>{t('About us')}</h2>
            </div>
            <div className={"bannerLayer1"}></div>
            <div className={"container"} data-aos="fade-up">
                <div className={"bx row"}>
                    <div className={"as col-4 col-md-4 col-sm-12 col-xs-12"}>
                        <img src={image2} alt={"Image"}/>
                    </div>
                    <div className={"col-8 col-md-8 col-sm-12 col-xs-12"}>
                        <h3>{t('About us')}</h3>
                        <h4>{t('ColorStorm – development level and technical solutions with over 10 years of experience')}</h4>
                        <h5>
                            {t('ColorStorm has been operating in the event and technical service sector for over 10 years. Our company offers professional solutions in the field of stage construction, monitor repair and other technical services. In addition, we are also engaged in the sale of monitors, lighting and sound equipment internally. Our goal is to provide our customers with high-quality and reliable service, and to make your events more spectacular with innovative technologies and modern equipment. You can contact us for additional information and services.')}
                        </h5>
                    </div>
                </div>
                <div className={"outTeam"}>
                    {/*<div className={"text"}>{t('Our team')}</div>*/}
                    {/*<div className={"text1"}>{t('Lets meet with our team')}</div>*/}
                    {/*<div className={"row"}>*/}
                        {/*<div className={"col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <div className={"box"}>*/}
                        {/*        <div className={"span"}>*/}
                        {/*            {t('We can')}*/}
                        {/*        </div>*/}
                        {/*        <div className={"span"}>*/}
                        {/*            {t('create')}*/}
                        {/*        </div>*/}
                        {/*        <div className={"span"}>*/}
                        {/*            {t('your dream')}*/}
                        {/*        </div>*/}
                        {/*        <div className={"span"}>*/}
                        {/*            {t('event')}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={"asd col-3 col-md-6 col-sm-6 col-xs-6"}>*/}
                        {/*    <img src={image1} alt={"Image"}/>*/}
                        {/*    <div className={"name1"}>*/}
                        {/*        Elvar Agamaliyev*/}
                        {/*    </div>*/}
                        {/*    <div className={"name2"}>*/}
                        {/*        Hərşeyşunas*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>
    );
}

export default AboutBanner;