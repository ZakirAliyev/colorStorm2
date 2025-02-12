import './index.scss'
import {Link} from "react-router-dom";
import {useState} from "react";
import {FaBars, FaChevronDown} from "react-icons/fa";
import {useGetAllServicesQuery} from "../../apiServices/usersApi.jsx";

function Navbar() {
    const [showDropdown, setShowDropdown] = useState(false);
    const {data: getAllServices} = useGetAllServicesQuery()
    const services = getAllServices?.data

    return (
        <section id={"navbar"}>
            <Link to={`/`}><img src={"/src/assets/logo.png"} alt={"Logo"}/></Link>

            <div className={"links"}>
                <Link to={`/about`} className={"link"}>About us</Link>

                <div className={"services-dropdown"}>
                    <button className="link dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
                        Services <FaChevronDown className={`chevron ${showDropdown ? "rotate" : ""}`}/>
                    </button>

                    {showDropdown && (
                        <div className="dropdown-menu">
                            {services && services.map((service, index) => (
                                <>
                                    <Link to={`/services/${service?.id}`}
                                          className="dropdown-item">{service?.name}</Link>
                                    <div className={"line"}></div>
                                </>
                            ))}
                        </div>
                    )}
                </div>

                <Link to={`/portfolio`} className={"link"}>Portfolio</Link>
            </div>

            <FaBars className={"icon"}/>
        </section>
    );
}

export default Navbar;
