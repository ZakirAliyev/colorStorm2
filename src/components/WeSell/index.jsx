import './index.scss'
import Card from "../Card/index.jsx";
import {useGetAllProductsQuery} from "../../apiServices/usersApi.jsx";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

function WeSell() {

    const {t} = useTranslation();
    const {data: getAllProducts} = useGetAllProductsQuery()
    const products = getAllProducts?.data
    const navigate = useNavigate();

    return (
        <section id={"weSell"}>
            <div className={"container"}>
                <h2>{t('We sell')}</h2>
                <p>{t('Something about our sales')}</p>
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