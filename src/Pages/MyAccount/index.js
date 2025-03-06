import { useState } from "react";
import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import MyProfile from "../../Components/MyProfile";
import Loader from "../../Common/Loader";

const MyAccount = () => {
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
                <MyProfile />
                <Footer />
            </>
        }
        </>
    )
}

export default MyAccount;