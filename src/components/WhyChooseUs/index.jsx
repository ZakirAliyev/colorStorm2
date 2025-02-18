import './index.scss'
import image1 from "/src/assets/chooseUs.png"
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {useEffect} from "react";
import 'aos/dist/aos.css';

function WhyChooseUs() {

    const {t} = useTranslation()
    const navigate = useNavigate()
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
        <section id={"whyChooseUs"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"box col-6 col-md-6 col-sm-12 col-xs-12"} data-aos="fade-right">
                        <img src={image1} alt={"Image"}/>
                    </div>
                    <div className={"box col-6 col-md-6 col-sm-12 col-xs-12"} data-aos="fade-left">
                        <h2>{t('Why choose us')}</h2>
                        <p>{t('We don\'t just set the stage - we bring your world to life! Every piece of our work is a window that takes the viewer into a new world. Your needs are the inspiration for our designs. We create stage designs that reflect you, respecting your individuality.')}</p>
                        <button onClick={() => {
                            window.scrollTo(0, 0)
                            navigate('/contact')
                        }}>{t('Let’s connect')}</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default WhyChooseUs;