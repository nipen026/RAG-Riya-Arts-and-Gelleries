import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import Loader from "../../Common/Loader";
import AdditionProduct from "../../Components/Addition-product";
import Banner from "../../Components/Banner";
import Product from "../../Components/Product";

const Home = () => {
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
                    <Banner />
                    <Product />
                    {/* <AdditionProduct /> */}
                    <Footer />
                </>
            }
        </>
    )
}

export default Home;