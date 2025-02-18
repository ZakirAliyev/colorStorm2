import './index.scss'
import {useTranslation} from "react-i18next";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {useEffect} from "react";

function ShortInfo() {

    const {t} = useTranslation();
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
        <section id={"shortInfo"}>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <h2>{t('Trusted by 100+ companies around the Azerbaijan')}</h2>
                    </div>
                    <div className={"col-6 col-md-6 col-sm-12 col-xs-12"}>
                        <p>{t('Those who choose us gain not only service, but also trust and quality. We are committed to our work, because the trust of our customers is the greatest value for us. Professionalism, innovation and quality are the foundation of our work.')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ShortInfo;