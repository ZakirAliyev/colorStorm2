import './index.scss'
import image1 from "../../assets/bg.jpg";

function Card() {
    return (
        <div className={"col-3 col-md-6 col-sm-6 col-xs-6"} id={"card"}>
            <div className={"box"}>
                <img src={image1} alt={"Image"}/>
                <div className={"wrapper"}>
                    <div className={"textWrapper"}>
                        <h3>Kategory</h3>
                        <h4>Product name</h4>
                    </div>
                    <button>MƏHSULU İNCƏLƏ</button>
                </div>
            </div>
        </div>
    );
}

export default Card;