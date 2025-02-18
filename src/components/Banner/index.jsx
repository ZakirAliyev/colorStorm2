import './index.scss'
import {useTranslation} from "react-i18next";
import 'aos/dist/aos.css';
import {useEffect} from "react";

function Banner() {

    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 100, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 0); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
    }, []);

    const {t} = useTranslation();

    return (
        <section id={"banner"}>
            <div className={"container"}>
                <h1>{t('We do')}</h1>
                <h1 className={"gradient"}>{t('Perfect')}</h1>
                <h1 className={"gradient gradient1"}>{t('Events')} <h1>{t('like')}</h1></h1>
                <h1>{t('never before')}</h1>
            </div>
        </section>
    );
}

export default Banner;