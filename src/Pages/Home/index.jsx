import Footer from "../../Common/Footer";
import Header from "../../Common/Header"
import AdditionProduct from "../../Components/Addition-product";
import Banner from "../../Components/Banner";
import Product from "../../Components/Product";

const Home = () =>{
    return(
        <>
            <Header/>
            <Banner/>
            <Product/>
            <AdditionProduct/>
            <Footer/>
        </>
    )    
}

export default Home;