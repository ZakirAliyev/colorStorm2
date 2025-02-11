import './index.scss'
import Card from "../Card/index.jsx";
import {useGetAllProductsQuery} from "../../apiServices/usersApi.jsx";

function WeSell() {

    const {data: getAllProducts} = useGetAllProductsQuery()
    const products = getAllProducts?.data

    return (
        <section id={"weSell"}>
            <div className={"container"}>
                <h2>We sell</h2>
                <p>Something about monitor sales</p>
                <div className={"row"}>
                    {products && products.slice(0, 4).map((product) => (
                        <Card product={product} key={product?.id}/>
                ))}
            </div>
            <div className={"button"}>
                <button>DAHA ÇOX</button>
            </div>
        </div>
</section>
)
    ;
}

export default WeSell;