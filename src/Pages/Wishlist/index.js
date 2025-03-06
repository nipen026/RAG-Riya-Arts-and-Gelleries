import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Loader from "../../Common/Loader";
import WishlistPage from "../../Components/WishlistPage";

const Wishlist = () => {
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
                    <WishlistPage />
                    <Footer />
                </>}
        </>
    )
}

export default Wishlist; 