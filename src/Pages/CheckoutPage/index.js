import { useState } from "react";
import Checkout from "../../Common/Checkout"
import Footer from "../../Common/Footer"
import Header from "../../Common/Header"
import Loader from "../../Common/Loader";

const CheckoutPage = () => {
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
                    <Checkout />
                    <Footer />
                </>}
        </>
    )
}

export default CheckoutPage;