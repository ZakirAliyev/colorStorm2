import './index.scss'
import image1 from "/src/assets/logo.png"
import {useGetAllBrandsQuery} from "../../apiServices/usersApi.jsx";

function LogoScroll() {

    const {data: getAllBrands} = useGetAllBrandsQuery()
    const brands = getAllBrands?.data
    console.log(brands)

    return (
        <section id={"logoScroll"}>
            <div className={"wrapper left"}>
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
            </div>
            <div className={"wrapper right"}>
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
                {brands && brands.slice().reverse().map((brand) => (
                    <div className={"box"}>
                        <img src={image1} alt={"Logo"}/>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LogoScroll;