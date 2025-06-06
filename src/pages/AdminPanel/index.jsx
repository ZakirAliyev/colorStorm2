import './index.scss'
import {useLocation, useNavigate} from "react-router";
import image2 from "../../assets/image.webp";
import {FaChevronDown, FaChevronUp} from "react-icons/fa";
import {useState} from "react";
import {CiLogout} from "react-icons/ci";
import AdminLeftBar from "../../components/AdminComponents/AdminLeftBar/index.jsx";
import Products from "../../components/AdminComponents/Products/index.jsx";
import Services from "../../components/AdminComponents/Services/index.jsx";
import Brands from "../../components/AdminComponents/Brands/index.jsx";
import Categories from "../../components/AdminComponents/Categories/index.jsx";
import Banners from "../../components/AdminComponents/Banners/index.jsx";
import Orders from "../../components/AdminComponents/Orders/index.jsx";
import PortfoliosPanel from "../../components/AdminComponents/Portfolios/index.jsx";
import {Helmet} from "react-helmet-async";
import {useTranslation} from "react-i18next";
import Cookies from "js-cookie";

function AdminPanel() {
    const location = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const navigate = useNavigate();

    const {t} = useTranslation();

    return (
        <section id="adminPanel">
            <Helmet>
                <title>{t('Admin Panel - ColorStorm')}</title>
            </Helmet>
            <AdminLeftBar/>
            <div className="wrapper">
                <div className="topClass">
                    <div className="profile">
                        <button onClick={toggleDropdown}>
                            {dropdownOpen ? <FaChevronUp/> : <FaChevronDown/>}
                        </button>
                        <span>Admin</span>
                        <img src={image2} alt="Profile"/>
                        {dropdownOpen && (
                            <div className="dropdown-menu">
                                <button onClick={() => {
                                    Cookies.set("colorStormToken", "null")
                                    Cookies.set("colorStormRole", "null")
                                    navigate('/')
                                }}>
                                    <CiLogout style={{
                                        color: 'red'
                                    }}/>
                                    <span style={{
                                        color: 'red'
                                    }}>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {location.pathname === "/cp/dashboard/products" ? (
                    <Products/>
                ) : location.pathname === "/cp/dashboard/services" ? (
                    <Services/>
                ) : location.pathname === "/cp/dashboard/brands" ? (
                    <Brands/>
                ) : location.pathname === "/cp/dashboard/categories" ? (
                    <Categories/>
                ) : location.pathname === "/cp/dashboard/banners" ? (
                    <Banners/>
                ) : location.pathname === "/cp/dashboard/orders" ? (
                    <Orders/>
                ) : location.pathname === "/cp/dashboard/portfolios" ? (
                    <PortfoliosPanel/>
                ) : null}
            </div>
        </section>
    );
}

export default AdminPanel;
