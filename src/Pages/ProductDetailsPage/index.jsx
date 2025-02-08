import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import ProductDetails from "../../Components/ProductDetails"
import Loader from "../../Common/Loader";

const ProductDetailsPage = () => {
    const [loader, setloader] = useState(false);
    setTimeout(() => {
        setloader(true)
    }, 2000);
    return (
        <>
            {!loader ?
                <Loader /> :
                <>
                    <Header />
                    <ProductDetails />
                    <Footer />
                </>}
        </>
    )
}

export default ProductDetailsPage;