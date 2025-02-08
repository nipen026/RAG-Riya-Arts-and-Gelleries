import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import CartPage from "../../Components/CartPage"
import Loader from "../../Common/Loader";

const Cart = () => {
    const [loader, setloader] = useState(false);
    setTimeout(() => {
        setloader(true)
    }, 1000);
    return (
        <>
            {!loader ?
                <Loader /> :
                <>
                    <Header />
                    <CartPage />
                    <Footer />
                    </>
            }
        </>
    )
}

export default Cart;