import './index.scss'
import {Link} from "react-router";
import image1 from "/src/assets/logo.png"
import {FaBars} from "react-icons/fa";

function Navbar() {
    return (
        <section id={"navbar"}>
            <img src={image1} alt={"Logo"}/>
            <div className={"links"}>
                <Link to={`/`} className={"link"}>About us</Link>
                <Link to={`/`} className={"link"}>Services</Link>
                <Link to={`/`} className={"link"}>Portfolio</Link>
            </div>
            <FaBars className={"icon"}/>
        </section>
    );
}

export default Navbar;