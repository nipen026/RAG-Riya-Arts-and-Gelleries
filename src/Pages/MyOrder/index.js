import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Loader from "../../Common/Loader";
import OrderPage from "../../Components/OrderPage";

const MyOrder = () => {
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
                    <OrderPage />
                    <Footer />
                </>}
        </>
    )
}

export default MyOrder;