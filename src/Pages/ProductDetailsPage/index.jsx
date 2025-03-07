import { useEffect, useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import ProductDetails from "../../Components/ProductDetails"
import Loader from "../../Common/Loader";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { GET_SINGLE_PRODUCT_DETAILS } from "../../api/api";

const ProductDetailsPage = () => {
    const [loader, setloader] = useState(false);
    const [productDetailsData, setProductDetails] = useState()

    const location = useLocation();
    const ProductDetailsApi = () => {
        const id = location.pathname.split('/')[2];
        GET_SINGLE_PRODUCT_DETAILS(id).then((res) => {
            setProductDetails(res.data.data);
            setloader(true)
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        setloader(false)
        ProductDetailsApi();
    }, [location])
    
    return (
        <>
         
            {!loader ?
                <Loader /> :
                <>
                    <Header />
                    <ProductDetails productDetailsData={productDetailsData} />
                    <Footer />
                </>}
        </>
    )
}

export default ProductDetailsPage;  