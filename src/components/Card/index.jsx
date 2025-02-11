import './index.scss'
import {PRODUCT_URL} from "../../constants.js";
import {useNavigate} from "react-router";

function Card({product}) {

    const navigate = useNavigate();

    return (
        <div className={"col-3 col-md-6 col-sm-6 col-xs-6"} id={"card"}>
            <div className={"box"}>
                <img src={PRODUCT_URL + product?.images[0]} alt={"Image"}/>
                <div className={"wrapper"}>
                    <div className={"textWrapper"}>
                        <h3>{product?.categoryName}</h3>
                        <h4>{product?.name}</h4>
                    </div>
                    <button onClick={() => {
                        window.scrollTo(0, 0)
                        navigate(`/services/${product?.id}`);
                    }}>MƏHSULU İNCƏLƏ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;