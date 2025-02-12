import './index.scss'
import image1 from "/src/assets/logo.png"
import {useGetAllBrandsQuery} from "../../apiServices/usersApi.jsx";
import {BRAND_URL} from "../../constants.js";

function LogoScroll() {

    const {data: getAllBrands} = useGetAllBrandsQuery()
    const brands = getAllBrands?.data
    console.log(brands)

    return (
        <section id={"logoScroll"}>
            <div className={"wrapper left"}>
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
            </div>
            <div className={"wrapper right"}>
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={BRAND_URL + brand?.imageName} alt={"Logo"}/>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;