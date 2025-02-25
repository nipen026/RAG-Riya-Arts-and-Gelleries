import { useEffect, useState } from "react";
import ProductCard from "../../Common/ProductCard";
// import { ProductData } from "../../data";
import { GET_PRODUCT_DETAILS } from "../../api/api";

const Product = () =>{
    const [productData,setProductData] = useState([]);
    useEffect(()=>{
        GET_PRODUCT_DETAILS().then((res)=>{
            setProductData(res.data.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    console.log(productData);
    
    return (
        <>
            <div className="container">
                    <div className="my-4 mt-[40px]">
                        <ProductCard productData={productData}/>
                    </div>
            </div>
        </>
    )
}

export default Product;