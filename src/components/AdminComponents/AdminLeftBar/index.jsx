import './index.scss';
import image1 from "/src/assets/logoWhite.png";
import {useNavigate} from "react-router-dom";
import {MdCategory, MdDesignServices} from "react-icons/md";
import {AiFillProduct} from "react-icons/ai";
import {useLocation} from "react-router";
import {TbBrandCodesandbox} from "react-icons/tb";
import {FaBorderAll, FaPortrait} from "react-icons/fa";

function AdminLeftBar() {
    const location = useLocation();
    const navigate = useNavigate();

    const isOrdersSelected = location.pathname === '/cp/dashboard/orders';
    const isProductsSelected = location.pathname === '/cp/dashboard/products';
    const isServicesSelected = location.pathname === '/cp/dashboard/services';
    const isBrandSelected = location.pathname === '/cp/dashboard/brands';
    const isCategoriesSelected = location.pathname === '/cp/dashboard/categories';
    const isBannersSelected = location.pathname === '/cp/dashboard/banners';
    const isPortfoliosSelected = location.pathname === '/cp/dashboard/portfolios';

    return (
        <section id={"adminLeftBar"}>
            <div>
                <div className={"img"}>
                    <img src={image1} alt={"Image"}/>
                </div>
                <div className={"routeWrapper"}>
                    <div
                        className={`route ${isOrdersSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/orders')}
                    >
                        <FaBorderAll/>
                        <span>Sifarişlər</span>
                    </div>
                    <div
                        className={`route ${isProductsSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/products')}
                    >
                        <AiFillProduct/>
                        <span>Məhsullar</span>
                    </div>
                    <div
                        className={`route ${isServicesSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/services')}
                    >
                        <MdDesignServices/>
                        <span>Servislər</span>
                    </div>
                    <div
                        className={`route ${isCategoriesSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/categories')}
                    >
                        <MdCategory/>
                        <span>Kateqoriyalar</span>
                    </div>
                    <div
                        className={`route ${isBrandSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/brands')}
                    >
                        <TbBrandCodesandbox/>
                        <span>Brendlər</span>
                    </div>
                    <div
                        className={`route ${isPortfoliosSelected ? 'selected' : ''}`}
                        onClick={() => navigate('/cp/dashboard/portfolios')}
                    >
                        <FaPortrait/>
                        <span>Portfoliolar</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AdminLeftBar;