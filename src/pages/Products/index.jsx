import "./index.scss";
import Navbar from "../../components/Navbar/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import {useGetAllProductsQuery, useGetAllCategoriesTreeQuery} from "../../apiServices/usersApi.jsx";
import Card from "../../components/Card/index.jsx";
import {useState} from "react";

function ProductsPage() {
    const {data: getAllProducts} = useGetAllProductsQuery();
    const {data: getAllCategories} = useGetAllCategoriesTreeQuery();
    const products = getAllProducts?.data;
    const categories = getAllCategories?.data;

    const [selectedMainCategory, setSelectedMainCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    return (
        <section id="productsPage">
            <Navbar/>
            <div className="productsPage">
                <div className="container">
                    <div className="row">
                        <div className="col-3 col-md-3 col-sm-12 col-xs-12">
                            <h2>FILTERS</h2>
                            <div className="leftBar">
                                <div className="box">
                                    <ul>
                                        {/* ALL PRODUCTS option */}
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
                                            ALL PRODUCTS
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
                                                    {category.name}
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
                                                            {sub.name}
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
