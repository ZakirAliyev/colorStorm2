import "./index.scss";
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import {useGetAllProductsQuery, useGetAllCategoriesTreeQuery} from "../../apiServices/usersApi.jsx";
import Card from "../../components/Card/index.jsx";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";
import {Helmet} from "react-helmet-async";
import 'aos/dist/aos.css';
import AOS from 'aos';

function ProductsPage() {
    const {data: getAllProducts} = useGetAllProductsQuery();
    const {data: getAllCategories} = useGetAllCategoriesTreeQuery();
    const products = getAllProducts?.data;
    const categories = getAllCategories?.data;
    useEffect(() => {
        const timer = setTimeout(() => {
            AOS.init({
                duration: 1000, // Animasyon süresi
                once: true, // Animasyon sadece bir kez çalışsın
            });
        }, 800); // 2 saniye gecikme

        return () => clearTimeout(timer); // Bileşen unmount olduğunda timer'ı temizle
    }, []);

    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const {t} = useTranslation()

    const colorStormLang = Cookies.get("colorStormLang");

    return (
        <section id="productsPage">
            <Helmet>
                <title>{t('Products- ColorStorm')}</title>
            </Helmet>
            <Navbar/>
            <div className="productsPage">
                <div className="container">
                    <div className="row">
                        <div className="col-3 col-md-3 col-sm-12 col-xs-12">
                            <h2>{t('FILTERS')}</h2>
                            <div className="leftBar">
                                <div className="box">
                                    <ul>
                                        <li
                                            onClick={() => {
                                                setSelectedMainCategory(null);
                                                setSelectedSubCategory(null);
                                            }}
                                            className={!selectedMainCategory ? "selected" : ""}
                                            style={{
                                                padding: '10px'
                                            }}
                                        >
                                            {t('ALL PRODUCTS')}
                                        </li>
                                        {categories && categories.map((category) => (
                                            <li key={category.id} className="category">
                                                <div className={"line"}>
                                                    <div className={"line1"}></div>
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        setSelectedMainCategory((prev) =>
                                                            prev === category.id ? null : category.id
                                                        )
                                                    }
                                                    className={`main-category ${selectedMainCategory === category.id ? "active" : ""}`}
                                                >
                                                    {colorStormLang === 'en' ? category.name :
                                                        colorStormLang === 'az' ? category.nameAz :
                                                            colorStormLang === 'ru' && category.nameRu}
                                                </div>
                                                <ul
                                                    className="sub-category-list"
                                                    style={{
                                                        maxHeight: selectedMainCategory === category.id ? "500px" : "0",
                                                        overflow: "hidden",
                                                        transition: "max-height 0.2s ease",
                                                    }}
                                                >
                                                    {category.subCategories && category.subCategories.map((sub) => (
                                                        <li
                                                            key={sub.id}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedMainCategory(category.id);
                                                                setSelectedSubCategory(sub.id);
                                                            }}
                                                            className={`sub-category ${selectedSubCategory === sub.id ? "selected" : ""}`}
                                                        >
                                                            {colorStormLang === 'en' ? sub.name :
                                                                colorStormLang === 'az' ? sub.nameAz :
                                                                    colorStormLang === 'ru' && sub.nameRu}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="npp col-9 col-md-9 col-sm-12 col-xs-12">
                            <div className="row">
                                {products &&
                                    products
                                        .filter(product => !selectedSubCategory || product.categoryId === selectedSubCategory)
                                        .map((product) => (
                                            <Card key={product.id} product={product}/>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    );
}

export default ProductsPage;
