import ProductCard from "../../Common/ProductCard";
import { ProductData } from "../../data";

const Product = () =>{
    return (
        <>
            <div className="container">
                    <div className="my-4 mt-[40px]">
                        <ProductCard productData={ProductData}/>
                    </div>
            </div>
        </>
    )
}

export default Product;