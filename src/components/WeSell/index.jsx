import './index.scss'
import Card from "../Card/index.jsx";
import {useGetAllProductsQuery} from "../../apiServices/usersApi.jsx";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import 'aos/dist/aos.css';
import {useEffect} from "react";

function WeSell() {

    const {t} = useTranslation();
    const {data: getAllProducts} = useGetAllProductsQuery()
    const products = getAllProducts?.data
    const navigate = useNavigate();
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
        <section id={"weSell"}>
            <div className={"container"}>
                <h2 data-aos="fade-left">{t('We sell')}</h2>
                <p data-aos="fade-left">{t('Something about our products')}</p>
                <div className={"row"}>
                    {products && products.slice(0, 4).map((product) => (
                        <Card product={product} key={product?.id}/>
                    ))}
                </div>
                <div className={"button"}>
                    <button onClick={() => {
                        window.scrollTo(0, 0)
                        navigate('/products')
                    }}>{t('MORE')}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default WeSell;