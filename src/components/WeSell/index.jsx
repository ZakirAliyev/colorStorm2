import './index.scss'
import Card from "../Card/index.jsx";

function WeSell() {
    return (
        <section id={"weSell"}>
            <div className={"container"}>
                <h2>We sell</h2>
                <p>Something about monitor sales</p>
                <div className={"row"}>
                    <Card/>
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
                <div className={"button"}>
                    <button>DAHA ÇOX</button>
                </div>
            </div>
        </section>
    );
}

export default WeSell;